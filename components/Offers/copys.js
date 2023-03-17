import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const clientSlice = createSlice({
    name: 'clients',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {
        getClientRequest: (state) => {
            state.loading = true;
        },
        getClientSuccess: (state, action) => {
            state.loading = false;
            state.data = [...state.data, action.payload]

        },
        getClientError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { getClientRequest, getClientSuccess, getClientError } = clientSlice.actions;

export const fetchClients = () => {
    return async (dispatch) => {
        try {
            dispatch(getClientRequest());
            const response = await axios.get('/api/clients');
            dispatch(getClientSuccess(response.data));
        } catch (error) {
            dispatch(getClientError(error.message));
        }
    };
}

export const selectClients = (state) => state.clients.data;

export const addClient = (client) => {
    return async (dispatch) => {
        try {
            dispatch(getClientRequest());
            const response = await axios.post('/api/clients', client);
            dispatch(getClientSuccess(response.data));
        } catch (error) {
            dispatch(getClientError(error.message));
        }
    };
}

export default clientSlice.reducer;