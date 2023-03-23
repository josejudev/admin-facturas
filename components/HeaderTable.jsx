import {useEffect,useRouter,useDispatch,useSelector,fetchClients,fetchOffers,handleModalClient,handleModalOffer,useAdmin} from '../exports/commonExports';
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';

const HeaderTable = ({ children, href='', title = ''}) => {
  const dispatch = useDispatch();
  const {data:dataClient} = useSelector((state) => state.clients);
  const {data:dataOffer} = useSelector((state) => state.offers);
  
  useEffect(() => {
    dispatch(fetchClients());
    dispatch(fetchOffers());
  }, [dispatch]);

  
  const router = useRouter();
  const { offers } = useAdmin();

  if(dataClient.length === 0 && router.pathname==="/") return null;
  const dataFiltered= dataClient.filter((client) => client.status === "Activo" )

  if(dataOffer.length === 0 && router.pathname==="/pedidos") return null;
  const dataFilteredOffer= dataOffer.filter((offer) => offer.status === "Pendiente" )

  if(dataFiltered.length === 0 && router.pathname==="/") return null;
  if(dataFilteredOffer.length === 0 && router.pathname==="/pedidos") return null;
  
  const pendingOffers = offers.filter((offer) => offer.status === "Pendiente" );

  const modalButton = (e) => {
    if(router.pathname === "/"){
      return (
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(handleModalOffer());
          }
          }
          type="button"
          className="text-white bg-sky-400 hover:bg-sky-500 border  focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 ">
          Agregar nueva oferta
        </button>
      )
    }else if(router.pathname === "/clientes"){
      return (
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(handleModalClient());
          }
          }
          type="button"
          className="text-white bg-sky-400 hover:bg-sky-500 border  focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 ">
          Agregar nuevo cliente
        </button>
      )
    }
    
    else{
      return null;
    }
  }
  


  return (
    <div className="px-2 sm:px-4 py-2.5">

      <div className=" flex flex-wrap items-center gap-4 mx-auto">
        <h1 className="text-5xl my-5 font-semibold text-gray-800">
          {`Tabla de ${title}`}
        </h1>
        <Link href={`${href}`}>


          {
            modalButton()
          }
        </Link>

      </div>
    </div>
  );
};

export default HeaderTable;
