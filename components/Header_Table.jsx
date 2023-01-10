import Link from "next/link";
import Modal from "./Modal";
import { useState } from "react";


const Header_Table = ({ children, href='', title }) => {
  const [showModal, setModal] = useState(false);
  return (
    <div >
      <div className="container flex flex-wrap items-center gap-4 mx-auto">
        <h1 className="text-5xl my-5 font-semibold text-gray-800">
          {`Tabla de ${title}`}
        </h1>
        <Link href={`${href}`}>
          <button
          onClick={() => setModal(true)}

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

        {/*
        Modal que contiene el formulario 
        */}
        <Modal isVisible={showModal} onClose = {() => setModal(false)}/>
        
      </div>
    </div>
  );
};

export default Header_Table;
