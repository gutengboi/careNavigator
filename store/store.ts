import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import diagnosisReducer from './diagnosisSlice';
import chatReducer from './chatSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    diagnosis: diagnosisReducer,
    chat: chatReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;