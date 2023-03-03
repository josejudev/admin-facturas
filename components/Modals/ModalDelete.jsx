import useAdmin from "../../hooks/useAdmin";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalDelete = ({children, title = ''}) => {
  const { handleModalDelete, offer,client } = useAdmin();
  const router = useRouter();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      switch (router.pathname) {
        case "/clientes":
          await axios.delete(`/api/clients/${client.id}`);
          router.push("/clientes");
          handleModalDelete();
          toast.error("Cliente eliminado correctamente",{
            icon:(
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
            )
          });
          break;
        case "/":
          await axios.delete(`/api/offers/${offer.id}`);
          router.push("/");
          handleModalDelete();
          break;
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleDelete}>
        <div className="w-[900px] flex flex-col">
          <div className="grid grid-cols-2  px-8 pt-6">
            <h1 className="text-4xl font-bold text-red-500">
              
              {router.pathname === "/clientes" ? "Eliminar cliente" : "Eliminar oferta"}
              
            </h1>
            <div className="flex justify-end">
              <button
                onClick={handleModalDelete}
                type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className=" grid grid-cols-1 px-8 pt-6 items-center justify-center text-center gap-7">
            <h1 className="text-xl font-semibold">¿Estas seguro que quieres eliminar {
              router.pathname === "/clientes" ? "el cliente" : "la oferta"
            }?</h1>
            <div className="flex flex-col items-center gap-4">
            <button className="text-white bg-red-500 hover:bg-red-600 border  focus:outline-none focus:ring-gray-100 font-semibold rounded-lg text-sm px-5 py-2.5 text-center items-center mr-2 w-1/3">Aceptar</button>
            <button onClick={handleModalDelete} className="text-white bg-blue-500 hover:bg-blue-600 border  focus:outline-none focus:ring-gray-100 font-semibold rounded-lg text-sm px-5 py-2.5 text-center items-center mr-2 w-1/3 ">Cancelar</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ModalDelete;
