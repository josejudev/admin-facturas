import Loader from "../Loader";
import OffersList from "./OffersList";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const OffersTable = ({ offers }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 2;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(offers.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(offers.length / itemsPerPage));
  }, [itemOffset, offers, itemsPerPage]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % offers.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className=" grid grid-cols-2 flex-wrap items-center mx-auto">
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64">
          <option value="UN"> Todos </option>
          <option value="RE">Pendientes</option>
        </select>
        <div className="col-span-1 grid grid-cols-3 gap-2">
          <input
            type="text"
            name="search"
            placeholder="Buscar"
            href="clientes/nuevo"
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
          {offers.length === 0 ? (
            <Loader />
          ) : (
            <OffersList offers={currentItems}></OffersList>
          )}
        </tbody>
      </table>

      <ReactPaginate
        breakLabel="..."
        //insert icon
        disabledClassName="hidden"
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName=" w-full flex items-center justify-center p-2 mt-4"
        pageClassName="mx-1"
        pageLinkClassName="page-link relative block py-1.5 px-3 rounded border-0  outline-none transition-all duration-300 rounded  hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
        nextLinkClassName="mx-4 py-1.5 px-3 transition-all duration-300 rounded  hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
        previousLinkClassName="mx-4 py-1.5 px-3 transition-all duration-300 rounded  hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
        activeLinkClassName="bg-sky-400 text-white hover:bg-sky-400 hover:text-white"
      />
    </>
  );
};

export default OffersTable;
