import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const milestoneSlice = createSlice({
    name: 'milestones',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        getMilestoneRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getMilestoneSuccess: (state, action) => {
            state.loading = false;
            state.data = state.data.filter((milestone) => milestone.id !== action.payload.id);
        },
        getMilestoneError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    getMilestoneRequest,
    getMilestoneSuccess,
    getMilestoneError,

} = milestoneSlice.actions;

export const fetchMilestones = (orderId) => {
    return async (dispatch) => {
        dispatch(getMilestoneRequest());
        try {
            const response = await axios.get(`/api/orders/${orderId}`);
            dispatch(getMilestoneSuccess(response.data));
        } catch (error) {
            dispatch(getMilestoneError(error.message));
        }
    };
}

export default milestoneSlice.reducer;