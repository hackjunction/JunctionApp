// import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import { thunk } from 'redux-thunk'
// import { composeWithDevTools } from '@redux-devtools/extension'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import LogRocket from 'logrocket'

import createRootReducer from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'user'],
    stateReconciler: autoMergeLevel2,
}

const persistedReducer = persistReducer(persistConfig, createRootReducer())

export default preloadedState => {
    const store = configureStore({
        reducer: persistedReducer,
        preloadedState,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: ['persist/PERSIST'],
                },
            }).concat(LogRocket.reduxMiddleware()),
        devTools: process.env.NODE_ENV === 'production' ? false : true,
    })
    const persistor = persistStore(store)
    return { store, persistor }
}
