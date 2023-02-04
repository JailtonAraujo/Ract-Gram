import { configureStore } from "@reduxjs/toolkit";

//Reduces
import authReducer from './slices/authSlice';
import userReducer from "./slices/useSlice"
import photoReducer from "./slices/photoSlice"

export const store = configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer,
        photo:photoReducer
    }
}) 