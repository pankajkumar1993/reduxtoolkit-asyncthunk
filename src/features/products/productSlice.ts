import { createSlice } from "@reduxjs/toolkit";
import { fetchProductById, fetchProducts } from "./productAction";

const initialState = {
    products: [],
    loading: false,
    error: null,
    selectedProduct: null,
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.payload as any;
                state.loading = false;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.selectedProduct = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            });
    },
})


export default productSlice.reducer;