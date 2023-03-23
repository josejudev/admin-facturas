import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchOffers } from "../offers/offerSlice";

export const clientSlice = createSlice({
  name: "clients",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    getClientRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getClientSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getClientError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addClientRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addClientSuccess: (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    addClientError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteClientRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteClientSuccess: (state, action) => {
      state.loading = false;
      state.data = state.data.filter((client) => client.id !== action.payload);
    },
    deleteClientError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = state.data.filter((client) => client.id !== action.payload);
    },
    updateClientRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateClientSuccess: (state, action) => {
      state.loading = false;
      state.data = state.data.map((client) =>
        client.id === action.payload.id ? action.payload : client
      );
    },
    updateClientError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getClientRequest,
  getClientSuccess,
  getClientError,
  addClientRequest,
  addClientSuccess,
  addClientError,
  deleteClientRequest,
  deleteClientSuccess,
  deleteClientError,
  updateClientRequest,
  updateClientSuccess,
  updateClientError
} = clientSlice.actions;

export const fetchClients = () => {
  return async (dispatch) => {
    try {
      dispatch(getClientRequest());
      const response = await axios.get("/api/clients");
      dispatch(getClientSuccess(response.data));
    } catch (error) {
      dispatch(getClientError(error.message));
    }
  };
};

export const addClient = (client) => {
  return async (dispatch) => {
    try {
      dispatch(addClientRequest());
      const response = await axios.post("/api/clients", client);
      dispatch(addClientSuccess(response.data));
    } catch (error) {
      dispatch(addClientError(error.message));
    }
  };
};

export const deleteClient = (id) => {
  return async (dispatch) => {
    try {
      dispatch(deleteClientRequest());
      await axios.delete(`/api/clients/${id}`);
      dispatch(deleteClientSuccess(id));
    } catch (error) {
      dispatch(deleteClientError(error.message));
    }
  };
};

export const updateClient = (client,id) => {
    return async (dispatch) => {
        try {
        dispatch(updateClientRequest());
        const response = await axios.put(`/api/clients/${id}`, client);
        dispatch(updateClientSuccess(response.data));
        dispatch(fetchOffers());
        } catch (error) {
        dispatch(updateClientError(error.message));
        }
    };
}


export default clientSlice.reducer;
