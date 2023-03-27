import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        getOrderRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getOrderSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        getOrderError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addOrderRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        addOrderSuccess: (state, action) => {
            state.loading = false;
            state.data.push(action.payload);
        },
        addOrderError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteOrderRequest:(state) => {
            state.loading = true;
            state.error = null;
        },
        deleteOrderSuccess:(state, action) => {
            state.loading = false;
            state.data = state.data.filter((order) => order.id !== action.payload)
        },
        deleteOrderError:(state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.data = state.data.filter((order) => order.id !== action.payload)
        },
        updateOrderRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateOrderSuccess: (state, action) => {
            state.loading = false;
            state.data = state.data.map((order) =>
                order.id === action.payload.id ? action.payload : order
            );
        },
        updateOrderError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    getOrderRequest,
    getOrderSuccess,
    getOrderError,
    addOrderRequest,
    addOrderSuccess,
    addOrderError,
    deleteOrderRequest,
    deleteOrderSuccess,
    deleteOrderError,
    updateOrderRequest,
    updateOrderSuccess,
    updateOrderError,
} = orderSlice.actions;

export const fetchOrders = () => {
    return async (dispatch) => {
        try {
            dispatch(getOrderRequest());
            const response = await axios.get('api/orders');
            dispatch(getOrderSuccess(response.data));
        } catch (error) {
            dispatch(getOrderError(error));
        }
    }
}

export const addOrder = (order) => {
    return async (dispatch) => {
        try {
            dispatch(addOrderRequest());
            const {date,fileName, name, concept, type, class_type, entity, offer_id, amount, final_amount, currency, order_balance,milestone} = order;
            const formData = new FormData();
            formData.append('date', date);
            formData.append('name', name);
            formData.append('concept', concept);
            formData.append('type', type);
            formData.append('class_type', class_type);
            formData.append('entity', entity);
            formData.append('offer_id', offer_id);
            formData.append('amount', amount);
            formData.append('final_amount', final_amount);
            formData.append('currency', currency);
            formData.append('order_balance', order_balance);
            formData.append('milestone', JSON.stringify(milestone));
            formData.append('fileName', fileName);
            console.log(formData.get('milestone'));
            const response = await axios.post('/api/orders', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            dispatch(addOrderSuccess(response.data));
        } catch (error) {
            dispatch(addOrderError(error));
            console.error( error);
        }
        
    }
}

export const deleteOrder = (id) => {
    return async (dispatch) => {
        try {
            dispatch(deleteOrderRequest());
            await axios.delete(`/api/orders/${id}`);
            dispatch(deleteOrderSuccess(id));
        } catch (error) {
            dispatch(deleteOrderError(error));
        }
    }
}


export default orderSlice.reducer;