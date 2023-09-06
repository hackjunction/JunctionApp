import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './i18n'
import './styles/tailwind.css'
import { CssBaseline } from '@material-ui/core'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { CloudinaryContext } from 'cloudinary-react'
import { SnackbarProvider } from 'notistack'
import WebFont from 'webfontloader'
import Notifier from './notifier'
import configureStore, { history } from 'redux/configureStore'
import config from 'constants/config'
// import theme from './material-ui-theme'
import theme from './junctionTheme'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)

const { store, persistor } = configureStore()

/** Disable log statements in production */
function noop() {}
if (!config.IS_DEBUG) {
    console.log = noop
    console.warn = noop
}

if (process.env.NODE_ENV === 'development') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render')
    whyDidYouRender(React)
}

WebFont.load({
    google: {
        families: [
            'Montserrat:400,400i,700,700i',
            'Lato:400,400i,700,700i',
            'Inter:400,400i,700,700i',
        ],
    },
})

ReactDOM.render(
    <Provider store={store}>
        <PersistGate
            loading={<div className="Preload" />}
            persistor={persistor}
        >
            <CloudinaryContext
                includeOwnBody={true}
                cloudName={config.CLOUDINARY_CLOUD_NAME}
            >
                <StylesProvider injectFirst>
                    <ThemeProvider theme={theme}>
                        <SnackbarProvider
                            maxSnack={3}
                            autoHideDuration={1000}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <Notifier />
                            <CssBaseline />
                            <App history={history} />
                        </SnackbarProvider>
                    </ThemeProvider>
                </StylesProvider>
            </CloudinaryContext>
        </PersistGate>
    </Provider>,
    document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
