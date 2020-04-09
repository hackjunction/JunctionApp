Here are working environment variables for all of the services we use in the Junction App. These environment variables are connected to sandbox accounts, which can be used while developing the platform. The accounts used in production are entirely separate, and should not be used in development, as a general rule of thumb.

### Frontend environment variables

Put these environment variables in `./frontend/.env` - you'll need to create the file as it is ignored from Git.

```
### Required values
PORT=3000
REACT_APP_CLOUDINARY_CLOUD_NAME=hackjunction-dev
REACT_APP_AUTH0_DOMAIN=
REACT_APP_AUTH0_CLIENT_ID=
REACT_APP_BASE_URL=http://localhost:3000
REACT_APP_IS_DEBUG=True
REACT_APP_AUTH0_DOMAIN=
REACT_APP_AUTH0_CLIENT_ID=
REACT_APP_CLOUDINARY_CLOUD_NAME=

### Extra values
REACT_APP_FACEBOOK_PIXEL_ID=
REACT_APP_LOGROCKET_ID=
REACT_APP_HOTJAR_ID=
REACT_APP_HOTJAR_SV=

### Customization values
REACT_APP_PAGE_TITLE=LOCAL Junkkari
REACT_APP_SEO_PAGE_TITLE<=LOCAL Junkkari
REACT_APP_SEO_PAGE_DESCRIPTION=Junkkari on tällänen
REACT_APP_SEO_IMAGE_URL=https://images.wisegeek.com/url-address.jpg
REACT_APP_SEO_TWITTER_HANDLE=@visathebean

### Production values
REACT_APP_API_BASE_URL=https://cms.www.hackjunction.com
REACT_APP_MAPBOX_TOKEN=
```

### Backend environment variables

Put these environment variables in `./backend/.env` - you'll need to create the file as it is ignored from Git.

```
PORT=2222
AUTH0_DOMAIN=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_AUTHORIZATION_EXTENSION_URL=
ID_TOKEN_NAMESPACE=https://app.hackjunction.com/
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_FOLDER=junctionapp-dev
SENDGRID_API_KEY=SG.
SENDGRID_FROM_EMAIL=noreply-dev@hackjunction.com
SENDGRID_FROM_NAME=Junction (Development)
SENDGRID_ACCEPTED_TEMPLATE=
SENDGRID_REJECTED_TEMPLATE=
SENDGRID_GENERIC_TEMPLATE=
MONGODB_URI=mongodb://localhost/junctionapp
FRONTEND_URL=http://localhost:3000
DEVTOOLS_ENABLED=true
ADMIN_TOKEN=foobar
HASH_SALT=
```
