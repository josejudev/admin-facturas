import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchOffers } from "../offers/offerSlice";
import { fetchClients } from "../clients/clientSlice";

export const modalSlice = createSlice({
    name: "modals",
    initialState: {
        modalOffer: false,
        modalClient: false,
        modalOrder: false,
    },
    reducers: {
        handleModalOffer: (state) => {
            state.modalOffer = !state.modalOffer;
        },
        handleModalClient: (state) => {
            state.modalClient = !state.modalClient;
        },
        handleModalOrder: (state) => {
            state.modalOrder = !state.modalOrder;
        }
    }

});

export const { handleModalOffer, handleModalClient, handleModalOrder } = modalSlice.actions;

export const selectModalOffer = (state) => state.modals.modalOffer;
export const selectModalClient = (state) => state.modals.modalClient;
export const selectModalOrder = (state) => state.modals.modalOrder;

export default modalSlice.reducer;