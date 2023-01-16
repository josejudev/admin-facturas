import React from "react";
import Clientsi from "./ClientsList";
import Loader from "./Loader";

const ClientsTable = ({clients}) => {

  return (
    <>
      <table
        className="table p-4 mt-10 bg-white rounded-lg shadow table-auto w-full"
      >
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
            {!Object.keys(clients).length ? <Loader/> : <Clientsi clients={clients}/>}

            
        </tbody>
      </table>
    </>
  );
};

export default ClientsTable;
