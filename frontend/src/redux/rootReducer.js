import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Import the reducer from each module here, and add it to the combined reducer
import account from './account/reducer';
import admin from './admin/reducer';
import auth from './auth/reducer';
import dashboard from './dashboard/reducer';
import eventdetail from './eventdetail/reducer';
import events from './events/reducer';
import organiser from './organiser/reducer';
import recruitment from './recruitment/reducer';
import user from './user/reducer';
import snackbar from './snackbar/reducer';

export default history =>
    combineReducers({
        router: connectRouter(history),
        account,
        admin,
        auth,
        dashboard,
        eventdetail,
        events,
        organiser,
        recruitment,
        snackbar,
        user
    });
