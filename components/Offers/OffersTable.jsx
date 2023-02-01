import React from "react";
import Loader from "../Loader";
import OffersList from "./OffersList";

const OffersTable = ({
    offers
}) => {
  return (
    <>
      <table className="table p-4 mt-10 bg-white rounded-lg shadow table-auto w-full">
        <thead>
          <tr>
            <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                      "
              />
            </th>
            <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
              Fecha
            </th>
            <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
              Nombre del proyecto
            </th>
            <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
              Cliente
            </th>
            <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
              Cliente final
            </th>
            <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
              Resumen de actividad
            </th>
            <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
              Estado
            </th>
            <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
              Documento
            </th>
            <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900 text">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
            {!Object.keys(offers).length ? <Loader/> : <OffersList offers={offers}/>}
        </tbody>
      </table>
    </>
  );
};

export default OffersTable;
