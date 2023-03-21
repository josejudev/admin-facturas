import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from '../features/clients/clientSlice';
import offersReducer from '../features/offers/offerSlice';
import ordersReducer from '../features/orders/orderSlice';

const store = configureStore({
  reducer: {
    clients: clientsReducer,
    offers: offersReducer,
    orders: ordersReducer,
  },
});

export default store;