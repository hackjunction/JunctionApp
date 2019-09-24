import './styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CloudinaryContext } from 'cloudinary-react';

import configureStore, { history } from 'redux/configureStore';
import config from 'constants/config';

const { store, persistor } = configureStore();

/** Disable log statements in production */
function noop() {}
if (process.env.NODE_ENV !== 'development') {
    console.log = noop;
    console.warn = noop;
    console.error = noop;
}

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<div className="Preload" />} persistor={persistor}>
            <CloudinaryContext includeOwnBody={true} cloudName={config.CLOUDINARY_CLOUD_NAME}>
                <App history={history} />
            </CloudinaryContext>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
