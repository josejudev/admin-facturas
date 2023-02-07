import Loader from "../Loader";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const OrdersTable = () => {


  return (
    <>
      <div className="grid grid-cols-2 flex-wrap items-center mx-auto">
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64">
          <option value="UN"> Todos </option>
          <option value="RE">Pendientes</option>
        </select>
        <div className="col-span-1 grid grid-cols-3 gap-2">
          <input
            type="text"
            name="search"
            placeholder="Buscar"
            className=" placeholder-gray-500 border-solid border-2 border-gray-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 bg-white rounded-lg h-11 p-1"
          />
          <input
            type="date"
            className="text-center border-solid border-2 border-gray-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 p-2.5 bg-white rounded-lg h-11"
          />

          <button className="border-solid border-2 border-gray-300 bg-white p-2.5 bg flex justify-center items-center text-green-400 rounded-lg h-11">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
          </button>
        </div>
      </div>
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
              Fecha del pedido
            </th>

            <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
              Cantidad
            </th>
            <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
              Tipo
            </th>
            <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
              Clase
            </th>
            <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
              N° de Pagos
            </th>
            <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
              Oferta
            </th>
            <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
              Pedido
            </th>
            <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900 text">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="text-center"></tbody>
      </table>

    </>
  );
};

export default OrdersTable;
