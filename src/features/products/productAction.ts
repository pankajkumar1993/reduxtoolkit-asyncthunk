import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const fetchProducts = createAsyncThunk(
    "products/fetchProduct",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/products`);
            return response.data
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }

        }
    }
)

export const fetchProductById = createAsyncThunk(
    "products/fetchProductById",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/products/${id}`);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);
