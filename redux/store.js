import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './clients/clientSlice';
import offersReducer from './offers/offerSlice';
import ordersReducer from './orders/orderSlice';
import modalsReducer from './modals/modalSlice';
import milestonesReducer from './milestones/milestoneSlice';
import usersSlice from './users/userSlice';

const store = configureStore({
  reducer: {
    clients: clientsReducer,
    offers: offersReducer,
    orders: ordersReducer,
    modals: modalsReducer,
    milestones: milestonesReducer,
    users: usersSlice,
  },
});

export default store;