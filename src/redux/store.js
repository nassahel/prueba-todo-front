// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';
import noteReducer from './noteSlice';


const persistConfig = {
    key: 'root',
    storage,
};


const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
    reducer: {
        auth: persistedUserReducer,
        notes: noteReducer
    },
});

export const persistor = persistStore(store);
export default store;