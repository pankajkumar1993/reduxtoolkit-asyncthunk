import { createSlice } from "@reduxjs/toolkit";
import { addUser, deleteUser, fetchSingleUser, fetchUsers, searchUsers, sortUsers, updateUser } from "./userActions";
import { initialStateProps, UserProps } from "../../types";

// ************ Intial State ************
const initialState: initialStateProps = {
    users: [],
    loading: false,
    error: undefined,
    status: "idle",
    searchData: [],
    selectedUser: null
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ************ Fetch Users Status ************
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.status = "pending";
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload as UserProps[];
                state.status = "success";
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.status = "failed";
            })
            // ************ Fetch Single User Status ************
            .addCase(fetchSingleUser.pending, (state) => {
                state.loading = true;
                state.status = "pending"
                state.selectedUser = null;
            })
            .addCase(fetchSingleUser.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "success";
                state.selectedUser = action.payload as UserProps;
            })
            .addCase(fetchSingleUser.rejected, (state) => {
                state.loading = false;
                state.status = "failed";
                state.error = "Unable to fetch user details.";
                state.selectedUser = null;
            })
            // ************ Add User ************
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.status = "pending"
            })
            .addCase(addUser.fulfilled, (state, action) => {
                console.log(action);

                state.loading = false;
                state.status = "success";
                state.users.push(action.payload)
            })
            .addCase(addUser.rejected, (state) => {
                state.loading = false;
                state.error = "Unable to add user!!!"
            })
            // ************ Delete User ************
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.status = "pending"
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "success";
                state.users = state.users.filter(user => user.id !== action.meta.arg);
            })
            .addCase(deleteUser.rejected, (state) => {
                state.loading = false;
                state.status = "failed";
                state.error = "Unable to delete user!!"
            })

            // **************** Update User ****************
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload; // Update the specific user in the list
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update user.";
            })
            // ************ Search User ************
            .addCase(searchUsers.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(searchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(searchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to search users.";
            })

            // ************ Sorting User ************
            .addCase(sortUsers.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(sortUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(sortUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to search users.";
            });

    }

})


export default userSlice.reducer;