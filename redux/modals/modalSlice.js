import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modals",
    initialState: {
        modalOffer: false,
        modalClient: false,
        modalOrder: false,
        modalOfferEdit: false,
        modalClientEdit: {
            modal: false,
            id: null
        },
        modalOrderEdit: false,
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
        },
        handleModalOfferEdit: (state) => {
            state.modalOfferEdit = !state.modalOfferEdit;
        },
        handleModalClientEdit: (state, action) => {
            state.modalClientEdit.modal = !state.modalClientEdit.modal;
            state.modalClientEdit.id = action.payload;
        },
        handleModalOrderEdit: (state) => {
            state.modalOrderEdit = !state.modalOrderEdit;
        }
    }

});

export const { 
    handleModalOffer,
    handleModalClient,
    handleModalOrder,
    handleModalOfferEdit,
    handleModalClientEdit,
    handleModalOrderEdit
 } = modalSlice.actions;

export const selectModalOffer = (state) => state.modals.modalOffer;
export const selectModalClient = (state) => state.modals.modalClient;
export const selectModalOrder = (state) => state.modals.modalOrder;
export const selectModalOfferEdit = (state) => state.modals.modalOfferEdit;
export const selectModalClientEdit = (state) => state.modals.modalClientEdit;
export const selectModalOrderEdit = (state) => state.modals.modalOrderEdit;

export default modalSlice.reducer;