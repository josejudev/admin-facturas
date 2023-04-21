import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
    name: "users",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        getUserRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getUserSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        getUserError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    getUserRequest,
    getUserSuccess,
    getUserError
} = userSlice.actions;

export const fetchUser = () => async (dispatch) => {
    dispatch(getUserRequest());
    try {
        const response = await axios.get("/api/auth/profile");
        dispatch(getUserSuccess(response.data));
    } catch (error) {
        dispatch(getUserError(error));
    }
}

export default userSlice.reducer;