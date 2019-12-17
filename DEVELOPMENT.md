# Setting up your development environment

Follow this quick guide to set up the project for local development. 

### Prerequisites

Before you begin, make sure you have the following installed on your system:

- Node.js 12.x (Recommended: use Nvm for managing Node versions)
- MongoDB 3.6.x

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

### Set up your environment variables

To be able to run the project, you'll need to set up some environment variables. Follow the instructions in `ENV.md` to do that. 

### Run the project in development mode

