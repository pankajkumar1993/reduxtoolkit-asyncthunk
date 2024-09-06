import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile, loginUser } from "./authActions";
import { AuthState } from "../../types";


const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null;



const initialState: AuthState = {
    loading: false,
    userInfo: null,
    userToken: userToken,
    error: undefined,
    success: false,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.userToken = null;
            state.userInfo = null;
            state.success = false;
            localStorage.removeItem('userToken');
            state.isAuthenticated = false
        },
        setCredentials: (state, action) => {
            state.userInfo = action.payload.userInfo;
            state.userToken = action.payload.userToken;
            localStorage.setItem('userToken', action.payload.userToken);
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        builder
            // ************ Login User Status ************
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.isAuthenticated = false;
                state.success = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log(action.payload, "userInfo");
                state.loading = false;
                state.success = true;
                state.userInfo = action.payload
                state.userToken = action.payload.userToken;
                state.isAuthenticated = true
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
                state.isAuthenticated = false;
            })
            // ************ Fetch User Profile ************
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.isAuthenticated = false;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.loading = false;
                state.userInfo = action.payload as any;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.loading = false;
                state.userInfo = null;
                state.error = action.error.message as any;
            })
    }
})

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;