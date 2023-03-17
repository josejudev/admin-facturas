import React from "react";
import ClientsList from "./ClientsList";
import ReactPaginate from "react-paginate";
import Loader from "../Loader";
import { useState, useEffect } from "react";


const ClientsTable = ({ clients }) => {
  if (Object.keys(clients).length === 0) {
    return <Loader type={"clientes registrados"} />
  }
  const [currentItems, setCurrentItems] = useState([]);

  const statusFiltered = [
    { id: 1, name: "Todos" },
    { id: 2, name: "Activo" },
    { id: 3, name: "Inactivo" },
  ];

  const [search, setSearch] = useState("");

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [dataFiltered, setDataFiltered] = useState({
    status_filtered: statusFiltered[0].name,
  });

  const [perPage, setPerPage] = useState(10);

  const itemsPerPage = perPage;
  const handleFilter = (e) => {
    setDataFiltered({
      ...dataFiltered,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    const filteredClients = clients.filter((client) =>
      (search === "" || ['name', 'rfc', 'fiscal_address', 'address', 'email', 'contact_name', 'contact_phone', 'contact_email'].some((key) => client[key].toLowerCase().includes(search.toLowerCase()))
      ) &&
      (dataFiltered.status_filtered === "Todos" || client.status === dataFiltered.status_filtered)
    );
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredClients.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredClients.length / itemsPerPage));
  }, [itemOffset, clients, search, itemsPerPage, dataFiltered]);


  const handlePageClick = (e) => {
    const newOffset = e.selected * itemsPerPage;
    setItemOffset(newOffset);
  };


  return (
    <>
      <div className=" grid grid-cols-2 flex-wrap items-center mx-auto">
        <select name="status_filtered" onChange={
          handleFilter
        } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64">
          {statusFiltered.map((status) => (
            <option key={status.id} value={status.name}> {
              status.name
            }</option>))}
        </select>
        <div className="col-span flex gap-2 items-end justify-end">
          <input
            type="text"
            name="search"
            onChange={(e) => setSearch(e.target.value)}

            placeholder="Buscar"
            className=" placeholder-gray-500 border-solid border-2 border-gray-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 bg-white rounded-lg h-11 p-1"
          />

          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64" value={perPage} onChange={(e) => setPerPage(Number(e.target.value))} >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">Todos</option>
          </select>


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
                      Status
                    </th>
                    <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  
                  <ClientsList clients={currentItems} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {clients && clients.length > 0 && (

        <ReactPaginate
          breakLabel="..."
          //insert icon
          disabledClassName="hidden"
          nextLabel="Siguiente"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="Anterior"
          renderOnZeroPageCount={null}
          containerClassName=" w-full flex items-center justify-center p-2 mt-4"
          pageClassName="mx-1"
          pageLinkClassName="page-link relative block py-1.5 px-3 rounded border-0  outline-none transition-all duration-300 rounded  hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
          nextLinkClassName="mx-4 py-1.5 px-3 transition-all duration-300 rounded  hover:text-gray-800 hover:bg-gray-200 focus:shadow-none border"
          previousLinkClassName="mx-4 py-1.5 px-3 transition-all duration-300 rounded  hover:text-gray-800 hover:bg-gray-200 focus:shadow-none border"
          activeLinkClassName="bg-sky-400 text-white hover:bg-sky-400 hover:text-white"
        />
      )}



    </>

  );
};

export default ClientsTable;
