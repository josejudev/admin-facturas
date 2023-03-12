import OffersList from "./OffersList";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Loader from "../Loader";
import axios from "axios";
import { useRouter } from "next/router";

const OffersTable = ({ offers }) => {
  const router = useRouter();


  const [checkedIds, setCheckedIds] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);

  const statusFiltered = [
    { id: 1, name: "Todos" },
    { id: 2, name: "Aceptado" },
    { id: 3, name: "Pendiente" },
    { id: 4, name: "Rechazado" },
  ];
 
  const [search, setSearch] = useState("");
  


  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [dataFiltered, setDataFiltered] = useState({
    status_filtered: statusFiltered[0].name,
  });
  
  const itemsPerPage = 10;

  const handleFilter = (e) => {
    setDataFiltered({
      ...dataFiltered,
      [e.target.name]: e.target.value,
    });

  }

  const handleBoxChange = (e) => {
    const id = parseInt(e.target.value);
    if (e.target.checked) {
      setCheckedIds([...checkedIds, id]);
    } else {
      setCheckedIds(checkedIds.filter((checkedId) => checkedId !== id));
    }
  };



  useEffect(() => {
    const filteredOffers = offers.filter((offer) =>
      (search === "" || ["project_name", "date", "final_client", "activity_resumen", "status"].some((key) => offer[key].toLowerCase().includes(search.toLowerCase()))
        || offer.client.name.toLowerCase().includes(search.toLowerCase())
      ) &&
      (dataFiltered.status_filtered === "Todos" || offer.status === dataFiltered.status_filtered)
    );
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredOffers.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredOffers.length / itemsPerPage));
  }, [itemOffset, offers, search, itemsPerPage, dataFiltered]);


  const handlePageClick = (e) => {
    const newOffset = e.selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  const handleDeteteClick = (e) => {
    e.preventDefault();
    setCheckedIds([]);
  
    axios.delete("/api/offers/manyDelete", { data: { checkedIds }})
      .then((response) => {
        router.push("/");
        // Manejar la respuesta de la API
      })
      .catch((error) => {
        // Manejar errores de la API
      });
  }
  if (Object.keys(offers).length === 0) {
    return <Loader
    type="ofertas registradas"

    />;
  } else{
  return (
    <>
      <div className=" grid grid-cols-2 flex-wrap items-center mx-auto">
        <div className="flex gap-2">

          <button
            type="button"
            onClick={handleDeteteClick}
            className="disabled:text-gray-500 disabled:border-gray-500 disabled:hover:bg-white disabled:cursor-not-allowed text-red-500  hover:bg-red-600 hover:transition hover:ease-in-out hover:delay-100 hover:text-white border border-red-500  focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 "

            {
            ...((checkedIds.length === 0) && { disabled: true })
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>

            Eliminar seleccionados
          </button>
        </div>

        <div className="flex justify-end gap-2">
        <select name="status_filtered" onChange={
            handleFilter
          } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-64">
            {statusFiltered.map((status) => (
              <option key={status.id} value={status.name}> {
                status.name
              }</option>))}

          </select>
          <input
            type="text"
            name="search"
            placeholder="Buscar"
            onChange={(e) => setSearch(e.target.value)}
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
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
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
                 
                    <OffersList offers={currentItems} search={search} checkedIds={checkedIds} handleBoxChange={handleBoxChange} />
               
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {offers && offers.length > 0 && (

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
  }
};

export default OffersTable;
