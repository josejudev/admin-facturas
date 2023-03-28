/**
 * @package imports
 */
import ReactPaginate from "react-paginate";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import Modal from "react-modal";


/**
 * @Redux imports
 */
import { useDispatch, useSelector } from 'react-redux';
//Client Slice
import { fetchClients, updateClient,deleteClient } from '../redux/clients/clientSlice';
//Modal Slice
import {handleModalOrderEdit,selectModalOrderEdit, handleModalClientEdit, handleModalClient,handleModalOffer,handleModalOfferEdit,selectModalClient, selectModalClientEdit, handleModalDelete,selectModalDelete, selectModalOffer,selectModalOfferEdit } from "../redux/modals/modalSlice";
//offers Slice
import { fetchOffers, addOffer,deleteOffer, updateOffer,fetchOfferById } from "../redux/offers/offerSlice";
//orders Slice
import { fetchOrders,addOrder,deleteOrder } from '../redux/orders/orderSlice'
//milestones Slice
import { fetchMilestones } from '../redux/milestones/milestoneSlice'


/**
 * @React imports
 * 
 * */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";


/**
 * @Components imports
 */
import AddOffer from "../components/Modals/AddOffer";
import AddClient from "../components/Modals/AddClient";
import EditOffer from "../components/Modals/EditOffer";
import EditClient from "../components/Modals/EditClient";
import EditMilestone from "../components/Modals/EditMilestone";
import ModalDelete from "../components/Modals/ModalDelete";
import Loader from "./../components/Loader";
import SkeletonLoader from "./../components/SkeletonLoader";

export {
    useState,
    useEffect,
    ReactPaginate,
    useDispatch,
    useSelector,
    fetchClients,
    Loader,
    SkeletonLoader,
    axios,
    toast,
    useRouter,
    updateClient,
    handleModalClientEdit,
    fetchOffers,
    handleModalClient,
    ToastContainer,
    AddOffer,
    EditOffer,
    AddClient,
    EditClient,
    selectModalClient,
    selectModalClientEdit,
    ModalDelete,
    handleModalDelete,
    Modal,
    handleModalOffer,
    selectModalOffer,
    addOffer,
    selectModalDelete,
    deleteClient,
    deleteOffer,
    updateOffer,
    handleModalOfferEdit,
    selectModalOfferEdit,
    fetchOfferById,
    fetchOrders,
    addOrder,
    deleteOrder,
    handleModalOrderEdit,
    selectModalOrderEdit,
    EditMilestone,
    fetchMilestones
}