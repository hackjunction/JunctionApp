/// <reference path="./.sst/platform/config.d.ts" />

/**
 * SST config for tch-platform (Junction hackathon platform)
 *
 * Providers used:
 *   - aws        (core infra: VPC, ECS, S3, CloudFront, ElastiCache, SES)
 *   - cloudflare (DNS + CDN proxy)
 *
 * Both are preloaded with SST — no extra provider installs needed.
 *
 * Optional providers to add later:
 *   - mongodbatlas  (managed MongoDB — currently using URI secret instead)
 *   - auth0         (manage Auth0 tenant as IaC)
 *   - @checkly/pulumi, @pulumiverse/sentry, datadog (monitoring)
 */

export default $config({
  app(input) {
    return {
      name: "tch-platform",
      home: "aws",
      removal: input.stage === "production" ? "retain" : "remove",
      protect: input.stage === "production",
      providers: {
        aws: {
          region: "eu-north-1",
        },
        cloudflare: true,
      },
    };
  },

  async run() {
    // ─────────────────────────────────────────────
    // 1. SECRETS — Auth0, Cloudinary, MongoDB, SendGrid + app
    // ─────────────────────────────────────────────
    const secrets = {
      // Auth0
      auth0Domain: new sst.Secret("Auth0Domain"),
      auth0ClientId: new sst.Secret("Auth0ClientId"),
      auth0ClientSecret: new sst.Secret("Auth0ClientSecret"),
      auth0AuthExtUrl: new sst.Secret("Auth0AuthExtUrl"),
      idTokenNamespace: new sst.Secret("IdTokenNamespace"),
      // Cloudinary
      cloudinaryApiKey: new sst.Secret("CloudinaryApiKey"),
      cloudinaryApiSecret: new sst.Secret("CloudinaryApiSecret"),
      cloudinaryCloudName: new sst.Secret("CloudinaryCloudName"),
      cloudinaryFolder: new sst.Secret("CloudinaryFolder"),
      // MongoDB
      mongodbUri: new sst.Secret("MongodbUri"),
      // SendGrid
      sendgridApiKey: new sst.Secret("SendgridApiKey"),
      sendgridGenericTemplate: new sst.Secret("SendgridGenericTemplate"),
      sendgridContactTemplate: new sst.Secret("SendgridContactTemplate"),
      sendgridContactMail: new sst.Secret("SendgridContactMail"),
      // App
      adminToken: new sst.Secret("AdminToken"),
      hashSalt: new sst.Secret("HashSalt"),
      // Optional
      discordBotToken: new sst.Secret("DiscordBotToken"),
      webhookApiKey: new sst.Secret("WebhookApiKey"),
    };

    // ─────────────────────────────────────────────
    // 2. NETWORKING — VPC
    // ─────────────────────────────────────────────
    const vpc = new sst.aws.Vpc("Vpc", {
      az: 2,
      nat: "ec2", // ~$6/mo vs $65/mo for managed NAT
      bastion: true, // SSH tunnel for debugging (~$3/mo, free with ec2 NAT)
    });

    // ─────────────────────────────────────────────
    // 3. CACHE — Redis (ElastiCache) for GraphQL subscriptions
    // ─────────────────────────────────────────────
    const redis = new sst.aws.Redis("Redis", {
      vpc,
      engine: "valkey", // OSS-compatible, ~25% cheaper than Redis
      instance:
        $app.stage === "production" ? "cache.t4g.small" : "cache.t4g.micro",
    });

    // ─────────────────────────────────────────────
    // 4. FILE STORAGE — S3 bucket for uploads/exports
    // ─────────────────────────────────────────────
    const uploads = new sst.aws.Bucket("Uploads", {
      access: "public",
      cors: true,
    });

    // ─────────────────────────────────────────────
    // 5. EMAIL — SES with Cloudflare DNS
    // ─────────────────────────────────────────────
    const email = new sst.aws.Email("Email", {
      sender: "hackjunction.com",
      dns: sst.cloudflare.dns(),
      dmarc: "v=DMARC1; p=quarantine; pct=100;",
    });

    // ─────────────────────────────────────────────
    // 6. CONTAINER CLUSTER — ECS Fargate
    // ─────────────────────────────────────────────
    const cluster = new sst.aws.Cluster("Cluster", { vpc });

    // ─────────────────────────────────────────────
    // 7. BACKEND SERVICE — Express + GraphQL
    // ─────────────────────────────────────────────
    const backend = new sst.aws.Service("Backend", {
      cluster,
      cpu: $app.stage === "production" ? "1 vCPU" : "0.5 vCPU",
      memory: $app.stage === "production" ? "2 GB" : "1 GB",
      storage: "30 GB",
      health: {
        command: [
          "CMD-SHELL",
          "curl -f http://localhost:2222/api/health || exit 1",
        ],
        interval: "30 seconds",
        timeout: "5 seconds",
        retries: 3,
        startPeriod: "60 seconds",
      },
      scaling: {
        min: $app.stage === "production" ? 2 : 1,
        max: $app.stage === "production" ? 8 : 2,
        cpuUtilization: 70,
        memoryUtilization: 80,
      },
      capacity:
        $app.stage === "production"
          ? [
              { weight: 70 }, // 70% on-demand
              { type: "spot", weight: 30 }, // 30% spot for cost savings
            ]
          : undefined,
      image: {
        context: ".",
        dockerfile: "Dockerfile",
      },
      link: [redis, uploads, email, ...Object.values(secrets)],
      environment: {
        NODE_ENV: "production",
        PORT: "2222",
        ENVIRONMENT_TAG: $app.stage,
        PLATFORM_OWNER_NAME: "Junction",
        SENDGRID_FROM_EMAIL: "noreply@hackjunction.com",
        SENDGRID_FROM_NAME: "Junction",
        SENDGRID_MAILING_LIST_ID: "7150117",
        CALENDAR_URL: "https://hackjunction.com/calendar",
      },
      logging: {
        retention: $app.stage === "production" ? "3 months" : "1 month",
      },
      dev: {
        command: "npm run dev",
        directory: "backend",
      },
    });

    // ─────────────────────────────────────────────
    // 8. FRONTEND — React SPA on S3 + CloudFront
    // ─────────────────────────────────────────────
    const frontend = new sst.aws.StaticSite("Frontend", {
      path: "frontend",
      build: {
        command: "npm run build",
        output: "build",
      },
      domain: {
        name:
          $app.stage === "production"
            ? "app.hackjunction.com"
            : `${$app.stage}.app.hackjunction.com`,
        dns: sst.cloudflare.dns({ proxy: true }), // Cloudflare CDN + DDoS protection
        redirects:
          $app.stage === "production"
            ? ["www.app.hackjunction.com"]
            : undefined,
      },
      environment: {
        REACT_APP_AUTH0_DOMAIN: secrets.auth0Domain.value,
        REACT_APP_AUTH0_CLIENT_ID: secrets.auth0ClientId.value,
        REACT_APP_CLOUDINARY_CLOUD_NAME: secrets.cloudinaryCloudName.value,
        REACT_APP_FRONTEND_URL:
          $app.stage === "production"
            ? "https://app.hackjunction.com"
            : `https://${$app.stage}.app.hackjunction.com`,
        REACT_APP_API_BASE_URL: $interpolate`${backend.url}`,
      },
    });

    // ─────────────────────────────────────────────
    // 9. CRON — Daily event results generation
    // ─────────────────────────────────────────────
    const cronTask = new sst.aws.Task("GenerateResults", {
      cluster,
      cpu: "0.25 vCPU",
      memory: "0.5 GB",
      image: {
        context: ".",
        dockerfile: "Dockerfile",
      },
      link: [redis, ...Object.values(secrets)],
      environment: {
        NODE_ENV: "production",
        TASK: "generate-event-results",
        ENVIRONMENT_TAG: $app.stage,
      },
    });

    const cron = new sst.aws.Cron("DailyResultsGen", {
      task: cronTask,
      schedule: "cron(0 2 * * ? *)", // 2:00 AM UTC daily
    });

    // ─────────────────────────────────────────────
    // 10. OUTPUTS
    // ─────────────────────────────────────────────
    return {
      frontendUrl: frontend.url,
      backendUrl: backend.url,
      redisHost: redis.host,
      redisPort: redis.port,
      uploadsName: uploads.name,
      bastionId: vpc.bastion,
    };
  },
});
