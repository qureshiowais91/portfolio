import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../../features/auth/authSlice";
import controllerReducer from "../../features/controller/controllerSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        controller: controllerReducer
    }
});