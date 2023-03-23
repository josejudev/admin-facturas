import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modals",
    initialState: {
        modalOffer: false,
        modalClient: false,
        modalOrder: false,
        modalDelete: false,

        modalOfferEdit: {
            modal: false,
            id: null
        },
        modalClientEdit: {
            modal: false,
            id: null
        },
        modalOrderEdit: {
            modal: false,
            id: null
        }
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
        handleModalDelete: (state) => {
            state.modalDelete = !state.modalDelete;
        },
        handleModalOfferEdit: (state, action) => {
            state.modalOfferEdit.modal = !state.modalOfferEdit.modal;
            state.modalOfferEdit.id = action.payload;
        },
        handleModalClientEdit: (state, action) => {
            state.modalClientEdit.modal = !state.modalClientEdit.modal;
            state.modalClientEdit.id = action.payload;
        },
        handleModalOrderEdit: (state, action) => {
            state.modalOrderEdit.modal = !state.modalOrderEdit.modal;
            state.modalOrderEdit.id = action.payload;
        }
    }

});

export const { 
    handleModalOffer,
    handleModalClient,
    handleModalOrder,
    handleModalDelete,
    handleModalOfferEdit,
    handleModalClientEdit,
    handleModalOrderEdit
 } = modalSlice.actions;

export const selectModalOffer = (state) => state.modals.modalOffer;
export const selectModalClient = (state) => state.modals.modalClient;
export const selectModalOrder = (state) => state.modals.modalOrder;
export const selectModalDelete = (state) => state.modals.modalDelete;
export const selectModalOfferEdit = (state) => state.modals.modalOfferEdit;
export const selectModalClientEdit = (state) => state.modals.modalClientEdit;
export const selectModalOrderEdit = (state) => state.modals.modalOrderEdit;

export default modalSlice.reducer;