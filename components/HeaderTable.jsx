import Link from "next/link";
import useAdmin from "../hooks/useAdmin";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux';
import { fetchClients } from '../pages/features/clients/clientSlice';
import { fetchOffers } from '../pages/features/offers/offerSlice';

const HeaderTable = ({ children, href='', title = ''}) => {
  const dispatch = useDispatch();
  const {dataClient, loading, error} = useSelector((state) => state.clients);
  const {data:dataOffer, loading: loadingOffer, error: errorOffer} = useSelector((state) => state.offers);
  
  useEffect(() => {
    dispatch(fetchClients());
    dispatch(fetchOffers());
  }, [dispatch]);


  
  
  
  const router = useRouter();
  const { handleModalOffer, handleModalClient,clients,offers } = useAdmin();

  if(dataClient.length === 0 && router.pathname==="/") return null;
  const dataFiltered= dataClient.filter((client) => client.status === "Activo" )

  if(dataOffer.length === 0 && router.pathname==="/pedidos") return null;
  const dataFilteredOffer= dataOffer.filter((offer) => offer.status === "Pendiente" )

  if(dataFiltered.length === 0 && router.pathname==="/") return null;
  if(dataFilteredOffer.length === 0 && router.pathname==="/pedidos") return null;
  
  const pendingOffers = offers.filter((offer) => offer.status === "Pendiente" );
  


  return (
    <div className="px-2 sm:px-4 py-2.5">

      <div className=" flex flex-wrap items-center gap-4 mx-auto">
        <h1 className="text-5xl my-5 font-semibold text-gray-800">
          {`Tabla de ${title}`}
        </h1>
        <Link href={`${href}`}>


          {
            <button
            onClick={
              router.pathname === "/" 
              ? handleModalOffer :handleModalClient 
              ? router.pathname === "/pedidos" 
              ?  null: handleModalClient : null
            }
            type="button"
            className="text-white bg-sky-400 hover:bg-sky-500 border  focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 ">
            Agregar nuevo
            </button>
          }
        </Link>

      </div>
    </div>
  );
};

export default HeaderTable;
