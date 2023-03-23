import { useEffect, useState } from "react";
import Loader from "../Loader";
import SkeletonLoader from "../SkeletonLoader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffers } from "../../redux/offers/offerSlice";
import { fetchClients } from "../../redux/clients/clientSlice";

import { useRouter } from "next/router";
import useAdmin from "../../hooks/useAdmin";
import ReactPaginate from "react-paginate";



const OffersT = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.offers);
  const router = useRouter();
  const { handleSetOffer, handleModalEditOffer, handleModalDelete } = useAdmin();


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
  const handlePageClick = (e) => {
    const newOffset = e.selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  const handleBoxChange = (e) => {
    const id = parseInt(e.target.value);
    if (e.target.checked) {
      setCheckedIds([...checkedIds, id]);
    } else {
      setCheckedIds(checkedIds.filter((checkedId) => checkedId !== id));
    }
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    setCheckedIds([]);

    axios.delete("/api/offers/manyDelete", { data: { checkedIds } })
      .then((response) => {
        router.push("/");
        // Manejar la respuesta de la API
      })
      .catch((error) => {
        // Manejar errores de la API
      });
  }


  useEffect(() => {
    if (data.length === 0 && !loading) {
      dispatch(fetchOffers());
    } else {
      const filteredOffers = data.filter((offer) =>
        (search === "" || ["project_name", "date", "final_client", "activity_resumen", "status"].some((key) => offer[key].toLowerCase().includes(search.toLowerCase()))
          || offer.client.name.toLowerCase().includes(search.toLowerCase())
        ) &&
        (dataFiltered.status_filtered === "Todos" || offer.status === dataFiltered.status_filtered)
      );
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(filteredOffers.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(filteredOffers.length / itemsPerPage));

    }

  }, [dispatch, data, search, itemsPerPage, dataFiltered, itemOffset]);


  if (data.length === 0) return <Loader table="ofertas registradas"/>;
  if (error) return <div>Error: {error}</div>;
  if (loading) return <SkeletonLoader/>;


  





  return (
    <>
      <div className=" grid grid-cols-2 flex-wrap items-center mx-auto">
        <div className="flex gap-2">

          <button
            type="button"
            onClick={handleDeleteClick}
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
                  {currentItems.map((offer) => (
                    <tr key={offer.id} className="text-gray-700  hover:bg-gray-50 hover:transition-all">
                      <td className="border-b-2 p-4 dark:border-dark-5">
                        <input
                          type="checkbox"
                          value={offer.id}

                          {
                          ...((offer.status === "Aceptado") && { disabled: true })
                          }
                          checked={checkedIds.includes(offer.id)}

                          onChange={handleBoxChange}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 disabled:cursor-not-allowed "
                        />
                      </td>
                      <td className="border-b-2 p-4">{offer.date}</td>
                      <td className="border-b-2 p-4">{offer.project_name}</td>
                      <td className="border-b-2 p-4">{offer?.client?.name}</td>
                      <td className="border-b-2 p-4">{offer.final_client}</td>
                      <td className="border-b-2 p-4">{offer.activity_resumen}</td>
                      <td className="border-b-2 p-4">
                        {offer.status === "Aceptado" ? <span className="border border-green-200 text-green-500 font-medium  shadow-lg shadow-green-300/10 px-4 py-0.5 rounded">{offer.status}</span> : offer.status === "Rechazado" ? <span className="border border-red-200 text-red-500 font-medium  shadow-lg shadow-red-300/10 px-4 py-0.5 rounded">{offer.status}</span> : <span className="border border-yellow-200 text-yellow-500 font-medium  shadow-lg shadow-yellow-300/10 px-4 py-0.5 rounded">{offer.status}</span>}


                      </td>
                      <td className="border-b-2 p-4">
                        <a
                          href={`/uploads/${offer.fileName}`}
                          alt="alt text"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 "
                        >
                          {
                            offer.id + "-" + offer.project_name.slice(0, 3).toUpperCase() + "-" + offer.activity_resumen.slice(0, 3).toUpperCase() + "-" + offer.final_client.slice(0, 3).toUpperCase() + "-" + offer.date.slice(0, 4)
                          }
                        </a>
                      </td>

                      <td className="border-b-2 p-4">
                        {/*
            action button
             */}
                        <div className="p-1">
                          <div className="group relative">
                            <button className="text-gray-500 px-6 h-10 rounded">
                              <div className="flex justify-center items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-8 h-8 flex"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                  />
                                </svg>
                              </div>
                            </button>
                            <nav
                              tabIndex="0"
                              className=" border-2 shadow-lg bg-white invisible border-gray-100 rounded w-[8rem] absolute left-2 bottom-1 transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1 z-10"
                            >
                              <ul className="py-1">
                                <li>
                                  <button
                                    onClick={() => {
                                      handleModalEditOffer()
                                      handleSetOffer(offer);
                                    }}
                                    type="button"
                                    className="block px-4 py-2 hover:bg-gray-100 text-cyan-600 w-full"
                                  >
                                    Editar
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() => {
                                      handleModalDelete();
                                      handleSetOffer(offer);
                                    }}
                                    type="button"
                                    className="block px-4 py-2 hover:bg-gray-100 text-red-600 w-full"
                                  >
                                    Eliminar
                                  </button>
                                </li>
                              </ul>
                            </nav>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
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
    </>
  )
}

export default OffersT
