import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Import the reducer from each module here, and add it to the combined reducer
import auth from './auth/reducer';
import admin from './admin/reducer';
import events from './events/reducer';
import organiser from './organiser/reducer';
import dashboard from './dashboard/reducer';
import user from './user/reducer';
import eventdetail from './eventdetail/reducer';
import account from './account/reducer';

export default history =>
    combineReducers({
        router: connectRouter(history),
        auth,
        admin,
        events,
        organiser,
        dashboard,
        user,
        eventdetail,
        account
    });
