import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ApiResponse, RejectError, UserProps } from "../../types";


// ************************** Baseurl **************************
const BASE_URL = "https://dummyjson.com/users";


// ************************** Fetch Users **************************
export const fetchUsers = createAsyncThunk<
    UserProps[],                   // Return type of the fulfilled action
    void,                     // Argument type (no argument in this case)
    { rejectValue: RejectError } // Type for `rejectWithValue`
>(
    "users/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<ApiResponse>(BASE_URL);

            return response.data.users;  // Return only the users array
        } catch (error) {
            let err = error as AxiosError;
            return rejectWithValue({
                message: err.message,
            });
        }
    }
);


// ************************** Fetch Single User **************************
export const fetchSingleUser = createAsyncThunk<
    UserProps,                 // Return type (single user object)
    number,                    // Argument type (user ID)
    { rejectValue: RejectError } // Type for `rejectWithValue`
>(
    "users/fetchSingleUser",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get<UserProps>(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            let err = error as AxiosError;
            return rejectWithValue({
                message: err.message,
            });
        }
    }
);


// ************************** Add User **************************

export const addUser = createAsyncThunk<
    UserProps,                 // Return type (single user object)
    UserProps,                 // Argument type (user data to be added)
    { rejectValue: RejectError } // Type for `rejectWithValue`
>(
    "users/addUser",           // Name of the thunk
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post<UserProps>(`${BASE_URL}/add`, payload);
            return response.data;
        } catch (error) {
            let err = error as AxiosError;
            return rejectWithValue({
                message: err.message,
            });
        }
    }
);


// ************************** Delete User **************************
export const deleteUser = createAsyncThunk<
    void,                      // Return type (no content, or void)
    number,                    // Argument type (user ID)
    { rejectValue: RejectError } // Type for `rejectWithValue`
>(
    "users/deleteUser",        // Updated action type
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            return; // No content to return
        } catch (error) {
            let err = error as AxiosError;
            return rejectWithValue({
                message: err.message,
            });
        }
    }
);


// ************************** Update User **************************
export const updateUser = createAsyncThunk<
    UserProps,                 // Return type (updated user object)
    UserProps,                 // Argument type (user data to be updated)
    { rejectValue: RejectError } // Type for `rejectWithValue`
>(
    "users/updateUser",        // Updated action type
    async (payload, { rejectWithValue }) => {
        try {
            const { id, ...userData } = payload;
            const response = await axios.put<UserProps>(`${BASE_URL}/${id}`, userData);
            return response.data;
        } catch (error) {
            let err = error as AxiosError;
            return rejectWithValue({
                message: err.message,
            });
        }
    }
);



// ************************** Search User **************************
export const searchUsers = createAsyncThunk<
    UserProps[],                     // Return type (array of users)
    string,                          // Argument type (search query)
    { rejectValue: RejectError }     // Type for `rejectWithValue`
>(
    "users/searchUsers",
    async (query, { rejectWithValue }) => {
        try {
            const response = await axios.get<{ users: UserProps[] }>(`${BASE_URL}/search`, {
                params: { q: query },
            });

            return response.data.users;  // Return the array of users
        } catch (error) {
            let err = error as AxiosError;
            return rejectWithValue({
                message: err.message,
            });
        }
    }
);


// ************************** Sort Users **************************
export const sortUsers = createAsyncThunk<
    UserProps[],                     // Return type (array of users)
    string,                          // Argument type (search query)
    { rejectValue: RejectError }     // Type for `rejectWithValue`
>(
    "users/sortUsers",
    async (query, { rejectWithValue }) => {
        try {
            const response = await axios.get<{ users: UserProps[] }>(`${BASE_URL}`, {
                params: { sortBy: 'firstName', order: query },
            });

            return response.data.users;
        } catch (error) {
            let err = error as AxiosError;
            return rejectWithValue({
                message: err.message,
            });
        }
    }
);