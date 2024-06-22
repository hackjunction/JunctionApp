import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import LogRocket from 'logrocket'

import createRootReducer from './rootReducer'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'user'],
    stateReconciler: autoMergeLevel2,
}

const persistedReducer = persistReducer(
    persistConfig,
    createRootReducer(history),
)

export default preloadedState => {
    const store = createStore(
        persistedReducer,
        preloadedState,
        composeWithDevTools(
            applyMiddleware(
                thunk,
                LogRocket.reduxMiddleware(),
                // ... other middlewares ...
            ),
        ),
    )
    const persistor = persistStore(store)
    return { store, persistor }
}
