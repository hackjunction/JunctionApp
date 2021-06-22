# Setting up your development environment

Follow this quick guide to set up the project for local development.

### Prerequisites

Before you begin, make sure you have the following installed on your system:

-   Node.js 12.x (Recommended: use Nvm for managing Node versions)
-   MongoDB 3.6.x

Regarding your development environment: _I highly recommend you to use VSCode with the Prettier and EsLint plugins installed. This way your code can be automatically fixed on save, according to the eslint/prettier configuration defined in the project._ The project will not allow commits that do not pass the linter.

### Clone the repository

```
git clone https://github.com/hackjunction/hackplatform.git
cd hackplatform
```

### Install dependencies

This is a monorepo consisting of a `backend`, `frontend` and `shared` folder, which all need to be installed separately. For convenience, there exists a `setup` script in the root-level package.json, which does that for you. To set up the project, just run (in the root folder):

```
npm install
npm run setup
```

### Auth0 tenant set up

JunctionApp uses Auth0 for user authentication and authorization. To set up Auth0 for local development:

1. Create an Auth0 account
2. Follow [this](https://auth0.com/docs/deploy/deploy-cli-tool/create-and-configure-the-deploy-cli-application) tutorial to create a `auth0-deploy-cli-extension` in Auth0
3. Add Auth0 Authorization extension to your tenant. [img. 1.]
4. Go to the Authorization extensions settings and enable API access
5. Fill `config.json` with `auth0-deploy-cli-extension` applications information and authorization extensions url. [img. 2]

-   AUTH0_DOMAIN
    -   from `auth0-deploy-cli-extension` [img. 2.]
-   AUTH0_CLIENT_ID
    -   from `auth0-deploy-cli-extension` [img. 2.]
-   AUTHO_CLIENT_SECRET
    -   from `auth0-deploy-cli-extension` [img. 2.]
-   AUDIENCE
    -   Your domain url
-   AUTHZ_URL
    -   from authorization extension [img. 2.]

6. Run `npm run auth0`. The script is going to display error message but everything works.

-   In your auth0 tenant there should be now 5 new applications.

7. Copy and paste Junction App SSO Client ID to every `applicationId` field in `authzExtConfig.json`
8. Import `authzExtConfig.json` file to the Authorization Extensions
9. In Authorization Extension click PUBLISH RULES

![img 1. authz extension](https://res.cloudinary.com/hackjunction/image/upload/v1623838367/github/documentation/121153778-07935600-c84f-11eb-80b1-447a71449b28.png) [img. 1.]

![img 2. auth0-extension](https://res.cloudinary.com/hackjunction/image/upload/v1623838367/github/documentation/2021-06-16_12-33.png) [img. 2]

![img 3. authz-url](https://res.cloudinary.com/hackjunction/image/upload/v1623838367/github/documentation/2021-06-16_12-35.png) [img. 3]

### Set up your environment variables

To be able to run the project, you'll need to set up some environment variables. Follow the instructions in `ENV.md` to do that.

### Run the project in development mode

Running the project in development mode requires running the React dev server and the Node.js backend concurrently. For convenience, there exists a `dev` script in the root level package.json which does that for you. So, to spin up both servers just run:

`npm run dev`

The app will automatically reload when you make changes to the code. Note: starting up the React development server will take some time on first startup, depending on the machine your working on, so be patient with it. Consequent code changes should reload the app quickly.

### Notes

The development version of Auth0 will automatically grant all permissions to users who sign up. When you create a new user in the app, you should by default have access to e.g. create new events on the organiser dashboard under /organise.
