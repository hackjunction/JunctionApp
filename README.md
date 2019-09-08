# Junction Hackathon Platform

All in one app to handle everything related to organising a hackathon.

## Directory structure
The project is set up as follows:

- The root level package.json contains some scripts for interacting with the project
- The API lives under `backend`, and the client under `frontend`
- `shared` contains an npm package with all of the shared code between the backend and frontend

## Installation

Just use `npm install` and the various `postinstall` scripts will do everything for you.

To run the app, you'll need various values in `frontend/.env` as well as `backend/.env`, and if these are missing the app will throw an error. You can get these from someone else who has them :)

# Other setup
Setting up the shared code integration:

1) Sign into `npm` in your shell, with an account that has access to push to the shared code package
2) Run `cp pre-commit.sample .git/hooks/pre-commit` to enable a git hook with prevents changes to the shared code

## Deployment

The app will trigger a new deployment to Dev & Staging when pushing to `master`.