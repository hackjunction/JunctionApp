import { combineReducers } from '@reduxjs/toolkit'

// Import the reducer from each module here, and add it to the combined reducer
import account from './account/reducer'
import admin from './admin/reducer'
import auth from './auth/reducer'
import dashboard from './dashboard/reducer'
//import eventdetail from './UNUSED_eventdetail/reducer'
//import events from './UNUSED_events/reducer'
import organiser from './organiser/reducer'
import recruitment from './recruitment/reducer'
import user from './user/reducer'
import snackbar from './snackbar/reducer'
// import { eventApi } from './organiser/actions'

// const organiserReducer = combineReducers({
//     ...organiser,
//     eventApi: eventApi.reducer,
// })

export default () =>
    combineReducers({
        account,
        admin,
        auth,
        dashboard,
        //eventdetail, (replaced with GraphQL)
        //events, (replaced with GraphQL)
        organiser,
        // organiserReducer,
        recruitment,
        snackbar,
        user,
        // [eventApi.reducerPath]: eventApi.reducer,
    })
