import { configureStore,combineReducers } from '@reduxjs/toolkit';
import cartSlice from './shopping-cart/cartSlice';
import cartUiSlice from './shopping-cart/cartUISlice';
import  authReducer  from './auth';
import storage from 'redux-persist/lib/storage'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

const persistConfig = {
  key: 'food',
  version: 1,
  storage,
}

const rootReducer = combineReducers({auth:authReducer,cart:cartSlice.reducer,cartUI:cartUiSlice.reducer})
const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

const persistor = persistStore(store);

export { store, persistor };