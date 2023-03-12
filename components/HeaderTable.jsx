import Link from "next/link";
import useAdmin from "../hooks/useAdmin";
import { useRouter } from "next/router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HeaderTable = ({ children, href='', title = ''}) => {
  const router = useRouter();
  const { handleModalOffer, handleModalClient,clients,offers } = useAdmin();
  return (
    <div className="px-2 sm:px-4 py-2.5">
      <ToastContainer
        position="bottom-center"
        autoClose={1800} 
      />
      <div className=" flex flex-wrap items-center gap-4 mx-auto">
        <h1 className="text-5xl my-5 font-semibold text-gray-800">
          {`Tabla de ${title}`}
        </h1>
        <Link href={`${href}`}>


          {
            router.pathname === "/" && Object.keys(clients).length === 0  ? null :<button
            onClick={
              router.pathname === "/" ? handleModalOffer : handleModalClient ? router.pathname === "/pedidos" ?  null: handleModalClient : null
            }
          type="button"
            className="text-white bg-sky-400 hover:bg-sky-500 border  focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 "
          >
            Agregar nuevo
          </button>
          }
        </Link>

      </div>
    </div>
  );
};

export default HeaderTable;
