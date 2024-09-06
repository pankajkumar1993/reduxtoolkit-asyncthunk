import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";
import userReducer from "../features/user/userSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        user: userReducer
    },
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch