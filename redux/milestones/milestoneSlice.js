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
        getAllMilestonesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getAllMilestonesSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        getAllMilestonesError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }

    }
});

export const {
    getMilestoneRequest,
    getMilestoneSuccess,
    getMilestoneError,
    getAllMilestonesRequest,
    getAllMilestonesSuccess,
    getAllMilestonesError
    

} = milestoneSlice.actions;

export const fetchMilestoneById = (orderId) => {
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

export const fetchAllMilestones = () => {
    return async (dispatch) => {
        dispatch(getAllMilestonesRequest());
        try {
            const response = await axios.get(`/api/milestones`);
            dispatch(getAllMilestonesSuccess(response.data));
        } catch (error) {
            dispatch(getAllMilestonesError(error.message));
        }
    };
}

export default milestoneSlice.reducer;