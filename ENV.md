# Environment variables for development usage

Here are working environment variables for all of the services we use in the Junction App. These environment variables are connected to sandbox accounts, which can be used while developing the platform. The accounts used in production are entirely separate, and should not be used in development, as a general rule of thumb.

### Frontend environment variables

Put these environment variables in `./frontend/.env` - you'll need to create the file as it is ignored from Git.

```
### Required values
PORT=3000
REACT_APP_BASE_URL=http://localhost:3000
REACT_APP_IS_DEBUG=True
REACT_APP_AUTH0_DOMAIN=hackjunction-dev.eu.auth0.com
REACT_APP_AUTH0_CLIENT_ID=cGjPXy4hjLz6qfKQrK0Ot3IbonxUWJVi
REACT_APP_CLOUDINARY_CLOUD_NAME=hackjunction-dev

### Extra values
REACT_APP_FACEBOOK_PIXEL_ID=1999365573713460
REACT_APP_LOGROCKET_ID=ja746e/junction-app-production
REACT_APP_HOTJAR_ID=1179129
REACT_APP_HOTJAR_SV=6

### Customization values
REACT_APP_PAGE_TITLE=LOCAL Junkkari
REACT_APP_SEO_PAGE_TITLE<=LOCAL Junkkari
REACT_APP_SEO_PAGE_DESCRIPTION=Junkkari on tällänen
REACT_APP_SEO_IMAGE_URL=https://images.wisegeek.com/url-address.jpg
REACT_APP_SEO_TWITTER_HANDLE=@visathebean

### Production values
REACT_APP_API_BASE_URL=https://cms.www.hackjunction.com
REACT_APP_MAPBOX_TOKEN=pk.eyJ1IjoiaGFja2p1bmN0aW9uIiwiYSI6ImNqdnFqaGtsMjI1ZWM0Ym9mZGg1cTNrODgifQ.opDfJH_G3cznE63MLRQ9ww
```

### Backend environment variables

Put these environment variables in `./backend/.env` - you'll need to create the file as it is ignored from Git.

```
PORT=2222
AUTH0_DOMAIN=hackjunction-dev.eu.auth0.com
AUTH0_CLIENT_ID=guhUjo6BjSW8J5jCuNvLFqzKfcgrOse4
AUTH0_CLIENT_SECRET=
AUTH0_AUTHORIZATION_EXTENSION_URL=https://hackjunction-dev.eu8.webtask.io/adf6e2f2b84784b57522e3b19dfc9201/api
ID_TOKEN_NAMESPACE=https://app.hackjunction.com/
CLOUDINARY_CLOUD_NAME=hackjunction-dev
CLOUDINARY_API_KEY=922865266434778
CLOUDINARY_API_SECRET=
CLOUDINARY_FOLDER=junctionapp-dev
SENDGRID_API_KEY=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
SENDGRID_FROM_EMAIL=noreply@hackjunction.com
SENDGRID_FROM_NAME=Junction (Local)
SENDGRID_ACCEPTED_TEMPLATE=
SENDGRID_REJECTED_TEMPLATE=
SENDGRID_GENERIC_TEMPLATE=d-63c888a5940b4bc59610b64a51e7f816
MONGODB_URI=mongodb://127.0.0.1:27017
#mongodb://heroku_681z901z:lahf7aqv8j4r6ut3u80o5gplet@ds127115.mlab.com:27115/heroku_681z901z
FRONTEND_URL=http://localhost:3000
DEVTOOLS_ENABLED=True
ADMIN_TOKEN=sgHKLAEYmU5LvM9mWZSkyzGeJcwZIu3N
HASH_SALT=$2b$05$VpRaIJRucWnj0.5m1gKSI.
```
