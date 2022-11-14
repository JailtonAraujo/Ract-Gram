import { configureStore } from "@reduxjs/toolkit";

//Reduces
import authReducer from './slices/authSlice';
import userReducer from "./slices/useSlice"


export const store = configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer,
    }
}) 