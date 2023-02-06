import Loader from "../Loader";
import OffersList from "./OffersList";
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate'

const OffersTable = ({offers}) => {

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 1;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(offers.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(offers.length / itemsPerPage));
  }, [
    itemOffset,
    offers,
    itemsPerPage
  ]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % offers.length;
    setItemOffset(newOffset);
  }

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
{
        offers.length === 0 ?(
          <Loader/>
        ): (<OffersList offers={currentItems}></OffersList> )
      } 
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
