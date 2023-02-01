import Link from "next/link";
import useAdmin from "../hooks/useAdmin";
import { useRouter } from "next/router";

const HeaderTable = ({ children, href='', title = ''}) => {
  const router = useRouter();
  const { handleModalOffer, handleModalClient } = useAdmin();
  return (
    <div>
      <div className="container flex flex-wrap items-center gap-4 mx-auto">
        <h1 className="text-5xl my-5 font-semibold text-gray-800">
          {`Tabla de ${title}`}
        </h1>
        <Link href={`${href}`}>
          <button
            onClick={
              router.pathname === "/" ? handleModalOffer : handleModalClient ? router.pathname === "/pedidos" ?  null: handleModalClient : null
            }
          type="button"
            className="text-white bg-sky-400 hover:bg-sky-500 border  focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 "
          >
            Agregar nuevo
          </button>
        </Link>
        <button
          type="button"
          className="text-white bg-red-500 hover:bg-red-600 border  focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 "
        >
          Eliminar seleccionados
        </button>
      </div>
    </div>
  );
};

export default HeaderTable;
