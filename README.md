# Junction Hackathon Platform

All in one app to handle everything related to organising a hackathon. Shall be documented better in the future.

## Directory structure
The project is set up as follows:

- The root level package.json contains some scripts for interacting with the project
- The API lives under `backend`, and the client under `frontend`
- `shared` contains an npm package with all of the shared code between the backend and frontend

## Installation

Just use `npm install` and the various `postinstall` scripts will do everything for you.

# Setting up the environment

There are two config-files which take some values from your `.env`, and if these are missing the app will refuse to start. You should:

1) Create `frontend/.env`, and check that all values expected in `frontend/src/constants/config.js` are defined in your .env
2) Create `backend/.env`, and check that all values expected in `backend/misc/config.js` are defined in your .env

You can get all of these values from someone else who has them :)

# Other setup
TODO: Instructions for setting up the shared code package

## Deployment

The app will trigger a new deployment to Dev & Staging when pushing to `master`.
