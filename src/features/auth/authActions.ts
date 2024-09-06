import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/config";
import { AuthUserProfile, RejectError } from "../../types";
import { RootState } from "../../store";

export interface LoginPayload {
    email: string;
    password: string;
    expiresInMins: number
}


// ************************** Login User **************************
export const loginUser = createAsyncThunk(
    'auth/login',
    async (payload: LoginPayload, { rejectWithValue }) => {
        try {
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post(`${BASE_URL}/auth/login`, payload, config);
            localStorage.setItem('userToken', data.token)
            return data
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)


// ************************** Get Profile **************************
export const fetchUserProfile = createAsyncThunk<
    AuthUserProfile,      // Return type of the fulfilled action
    void,                 // Argument type (no arguments needed)
    { state: RootState; rejectValue: RejectError }  // ThunkAPI with state and rejectValue types
>(
    'user/fetchUserWithToken',
    async (_, { getState, rejectWithValue }) => {
        try {

            const { userToken } = (getState() as RootState).auth;
            let config = {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                },
            };
            const response = await axios.get<AuthUserProfile>(`${BASE_URL}/user/me`, config);
            return response.data;
        } catch (error) {
            let err = error as AxiosError;
            return rejectWithValue({
                message: err.message,
            });
        }
    }
);