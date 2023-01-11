import Layout from "../../components/Layout";
import Link from "next/link";
import useAdmin from "../../hooks/useAdmin";
import Header_Table from "../../components/Header_Table";
import React, { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";

const index = () => {
  const { clients } = useAdmin();
  const tableRef = useRef(null);
  return (
    <>
      <>
        <Layout title={"Clientes"} description="This is the pedidos page">
          <Header_Table title="Clientes" modalState={true} />
          <div className="container mx-auto bg-white h-full p-5 rounded-lg">
            <div className="container grid grid-cols-2 flex-wrap items-center mx-auto">
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
                <DownloadTableExcel
                  filename="users table"
                  sheet="users"
                  currentTableRef={tableRef.current}
                >
                  <button className="border-solid border-2 border-gray-300 bg-white p-2.5 bg flex justify-center items-center text-green-400 rounded-lg h-11 w-full">
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
                </DownloadTableExcel>
              </div>
            </div>
            <table
              ref={tableRef}
              className="table p-4 mt-10 bg-white rounded-lg shadow table-auto w-full"
            >
              <thead>
                <tr>
                  <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                {clients.map((client) => (
                  <tr key={client.id} className="text-gray-700">
                    <td className="border-b-2 p-4 dark:border-dark-5">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </td>
                    <td className="border-b-2 p-4">{client.name}</td>
                    <td className="border-b-2 p-4">{client.rfc}</td>
                    <td className="border-b-2 p-4">{client.fiscal_address}</td>
                    <td className="border-b-2 p-4">{client.address}</td>
                    <td className="border-b-2 p-4">{client.email}</td>
                    <td className="border-b-2 p-4">{client.contact_phone}</td>
                    <td className="border-b-2 p-4">{client.contact_email}</td>

                    <td className="border-b-2 p-4 ">
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
                          d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Layout>
      </>
    </>
  );
};

export default index;
