import useAdmin from "../../hooks/useAdmin";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

const ModalDelete = () => {
  const { handleModalDelete, offer } = useAdmin();
  const router = useRouter();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.delete(`/api/offers/${offer.id}`);
        handleModalDelete();
        router.push("/");
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
              Eliminar Oferta
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
            <h1 className="text-xl font-semibold">¿Estas seguro que quieres eliminar la oferta {offer.title}?</h1>
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
