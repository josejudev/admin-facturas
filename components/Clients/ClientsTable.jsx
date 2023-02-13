import React from "react";
import ClientsList from "./ClientsList";
import ReactPaginate from "react-paginate";
import Loader from "../Loader";

const ClientsTable = ({ clients }) => {
  if (Object.keys(clients).length === 0) {
    return <Loader type={"clientes registrados"} />
  }





  return (
    <>
      <div className=" grid grid-cols-2 flex-wrap items-center mx-auto">
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64">
          <option value="UN"> Todos </option>
          <option value="RE">Pendientes</option>
        </select>
        <div className="col-span flex gap-2 items-end justify-end">
          <input
            type="text"
            name="search"


            placeholder="Buscar"
            className=" placeholder-gray-500 border-solid border-2 border-gray-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 bg-white rounded-lg h-11 p-1"
          />


          <button className="border-solid border-2 border-gray-300 bg-white p-2.5 bg flex justify-center items-center text-green-400 rounded-lg h-11 w-60">
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
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table
                className="table p-4 mt-10 bg-white rounded-lg shadow table-auto w-full"
              >
                <thead>
                  <tr>
                    <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                      "
                      />
                    </th>
                    <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                      Nombre/Razón Social
                    </th>
                    <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                      RFC
                    </th>
                    <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                      Dirección Fiscal
                    </th>
                    <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                      Dirección
                    </th>
                    <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                      Email
                    </th>
                    <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                      Nombre de contacto
                    </th>
                    <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                      Telefono de contacto
                    </th>
                    <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                      Email de contacto
                    </th>
                    <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <ClientsList clients={clients} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ClientsTable;
