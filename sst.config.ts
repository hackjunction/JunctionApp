/// <reference path="./.sst/platform/config.d.ts" />

/**
 * SST config for tch-platform (Junction hackathon platform)
 *
 * Providers used:
 *   - aws        (core infra: VPC, ECS, S3, CloudFront, ElastiCache, SES)
 *   - cloudflare (DNS + CDN proxy)
 *
 * MongoDB is managed externally via Atlas — connection URI passed as a secret.
 * Cron task (daily results generation) to be added after upgrading to Cluster v2.
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
          profile: process.env.AWS_PROFILE ?? "AdministratorAccess-369559608088",
        },
        cloudflare: "6.13.0",
      },
    };
  },

  async run() {
    await import("dotenv/config");

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

    const isProd = $app.stage === "production";
    const domain = "thatcryptohackathon.com";
    const frontendDomain = isProd
      ? `app.${domain}`
      : `${$app.stage}.app.${domain}`;
    const frontendUrl = `https://${frontendDomain}`;

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
      instance: isProd ? "t4g.small" : "t4g.micro",
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
      sender: domain,
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
      cpu: isProd ? "1 vCPU" : "0.5 vCPU",
      memory: isProd ? "2 GB" : "1 GB",
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
        min: isProd ? 2 : 1,
        max: isProd ? 8 : 2,
        cpuUtilization: 70,
        memoryUtilization: 80,
      },
      loadBalancer: {
        rules: [
          { listen: "80/http", redirect: "443/https" },
          { listen: "443/https", forward: "2222/http" },
        ],
        domain: {
          name: isProd ? `api.${domain}` : `${$app.stage}.api.${domain}`,
          dns: sst.cloudflare.dns(),
        },
      },
      image: {
        context: ".",
        dockerfile: "Dockerfile",
      },
      link: [redis, uploads, email, ...Object.values(secrets)],
      environment: {
        NODE_ENV: "production",
        PORT: "2222",
        WEB_CONCURRENCY: "1",
        ENVIRONMENT_TAG: $app.stage,
        FRONTEND_URL: frontendUrl,
        // Auth0
        AUTH0_DOMAIN: secrets.auth0Domain.value,
        AUTH0_CLIENT_ID: secrets.auth0ClientId.value,
        AUTH0_CLIENT_SECRET: secrets.auth0ClientSecret.value,
        AUTH0_AUTHORIZATION_EXTENSION_URL: secrets.auth0AuthExtUrl.value,
        ID_TOKEN_NAMESPACE: secrets.idTokenNamespace.value,
        // Cloudinary
        CLOUDINARY_API_KEY: secrets.cloudinaryApiKey.value,
        CLOUDINARY_API_SECRET: secrets.cloudinaryApiSecret.value,
        CLOUDINARY_CLOUD_NAME: secrets.cloudinaryCloudName.value,
        CLOUDINARY_FOLDER: secrets.cloudinaryFolder.value,
        // MongoDB
        MONGODB_URI: secrets.mongodbUri.value,
        // SendGrid
        SENDGRID_API_KEY: secrets.sendgridApiKey.value,
        SENDGRID_GENERIC_TEMPLATE: secrets.sendgridGenericTemplate.value,
        SENDGRID_CONTACT_TEMPLATE: secrets.sendgridContactTemplate.value,
        SENDGRID_CONTACT_MAIL: secrets.sendgridContactMail.value,
        SENDGRID_FROM_EMAIL: `noreply@${domain}`,
        SENDGRID_FROM_NAME: "That Crypto Hackathon",
        SENDGRID_MAILING_LIST_ID: "7150117",
        // App
        ADMIN_TOKEN: secrets.adminToken.value,
        HASH_SALT: secrets.hashSalt.value,
        PLATFORM_OWNER_NAME: "That Crypto Hackathon",
        CALENDAR_URL: `https://${domain}/calendar`,
        // Optional
        DISCORD_BOT_TOKEN: secrets.discordBotToken.value,
        WEBHOOK_API_KEY: secrets.webhookApiKey.value,
        // Redis — backend reads REDISCLOUD_URL directly in graphql modules
        REDISCLOUD_URL: $interpolate`redis://${redis.host}:${redis.port}`,
      },
      logging: {
        retention: isProd ? "3 months" : "1 month",
      },
      dev: {
        command: "bun run dev",
        directory: "backend",
      },
    });

    // ─────────────────────────────────────────────
    // 8. FRONTEND — React SPA on S3 + CloudFront
    // ─────────────────────────────────────────────
    const frontend = new sst.aws.StaticSite("Frontend", {
      path: "frontend",
      build: {
        command: "NODE_OPTIONS=--openssl-legacy-provider bun run build",
        output: "build",
      },
      domain: {
        name: frontendDomain,
        dns: sst.cloudflare.dns({ proxy: true }), // Cloudflare CDN + DDoS protection
        redirects: isProd ? [`www.app.${domain}`] : undefined,
      },
      environment: {
        REACT_APP_AUTH0_DOMAIN: secrets.auth0Domain.value,
        REACT_APP_AUTH0_CLIENT_ID: secrets.auth0ClientId.value,
        REACT_APP_CLOUDINARY_CLOUD_NAME: secrets.cloudinaryCloudName.value,
        REACT_APP_ID_TOKEN_NAMESPACE: secrets.idTokenNamespace.value,
        REACT_APP_BASE_URL: $interpolate`${backend.url}`,
        REACT_APP_FRONTEND_URL: frontendUrl,
      },
    });

    // ─────────────────────────────────────────────
    // 9. OUTPUTS
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
