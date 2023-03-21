import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from '../features/clients/clientSlice';
import offersReducer from '../features/offers/offerSlice';

const store = configureStore({
  reducer: {
    clients: clientsReducer,
    offers: offersReducer,
  },
});

export default store;