import Loader from "./../components/Loader";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import useAdmin from "../hooks/useAdmin";
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients } from '../redux/clients/clientSlice';
import SkeletonLoader from "./../components/SkeletonLoader";


export {
    useState,
    useEffect,
    useAdmin,
    ReactPaginate,
    useDispatch,
    useSelector,
    fetchClients,
    Loader,
    SkeletonLoader
}