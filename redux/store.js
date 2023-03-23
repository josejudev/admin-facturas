import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './clients/clientSlice';
import offersReducer from './offers/offerSlice';
import ordersReducer from './orders/orderSlice';
import modalsReducer from './modals/modalSlice';

const store = configureStore({
  reducer: {
    clients: clientsReducer,
    offers: offersReducer,
    orders: ordersReducer,
    modals: modalsReducer,
  },
});

export default store;