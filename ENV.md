# Environment variables for development usage

Here are working environment variables for all of the services we use in the Junction App. These environment variables are connected to sandbox accounts, which can be used while developing the platform. The accounts used in production are entirely separate, and should not be used in development, as a general rule of thumb.

### Frontend environment variables

Put these environment variables in `./frontend/.env` - you'll need to create the file as it is ignored from Git.

```
PORT=3000
REACT_APP_CLOUDINARY_CLOUD_NAME=hackjunction-dev
REACT_APP_AUTH0_DOMAIN=hackjunction-dev.eu.auth0.com
REACT_APP_AUTH0_CLIENT_ID=cGjPXy4hjLz6qfKQrK0Ot3IbonxUWJVi
REACT_APP_BASE_URL=http://localhost:3000
REACT_APP_IS_DEBUG=true

## Not necessary in development
# REACT_APP_FACEBOOK_PIXEL_ID=your-pixel-id
```

### Backend environment variables

Put these environment variables in `./backend/.env` - you'll need to create the file as it is ignored from Git.

```
## ./backend/.env

PORT=2222
AUTH0_DOMAIN=hackjunction-dev.eu.auth0.com
AUTH0_CLIENT_ID=guhUjo6BjSW8J5jCuNvLFqzKfcgrOse4
AUTH0_CLIENT_SECRET=4LzX3gGHHwhGAfCdjMAo9JE07q74Xs1I_hvnYUKoqZFmCx8px2FiULii_ieRxBl2
AUTH0_AUTHORIZATION_EXTENSION_URL=https://hackjunction-dev.eu8.webtask.io/adf6e2f2b84784b57522e3b19dfc9201/api
ID_TOKEN_NAMESPACE=https://app.hackjunction.com/
CLOUDINARY_CLOUD_NAME=hackjunction-dev
CLOUDINARY_API_KEY=922865266434778
CLOUDINARY_API_SECRET=o8otgoTvdanHx5j4tjMdzylil9g
CLOUDINARY_FOLDER=junctionapp
SENDGRID_API_KEY=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
SENDGRID_FROM_EMAIL=noreply-dev@hackjunction.com
SENDGRID_FROM_NAME=Junction (Development)
SENDGRID_ACCEPTED_TEMPLATE=d-03a43d93d2924a8689462b7910421996
SENDGRID_REJECTED_TEMPLATE=d-56604c4fca0a4c55949ed00bdc377201
SENDGRID_GENERIC_TEMPLATE=d-7665f66a1aaa48f694f7cbb0bae599ee
MONGODB_URI=mongodb://localhost/junctionapp
FRONTEND_URL=http://localhost:3000
DEVTOOLS_ENABLED=true
ADMIN_TOKEN=foobar
HASH_SALT=$2a$10$dgX1nE97eY8xym2sBYusDuuB.
```
