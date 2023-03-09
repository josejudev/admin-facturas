import Loader from "../Loader";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import OrdersList from "./OrdersList";
import axios from "axios";
import { useRouter } from "next/router";


const OrdersTable = ({orders}) => {
  const router = useRouter();


  const [checkedIds, setCheckedIds] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);

  const statusFiltered = [
    { id: 1, name: "Todos" },
    { id: 2, name: "Activo" },
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
    const filteredOrders =orders.filter((order) =>
      (search === "" || ["name", "date" ].some((key) => order[key].toLowerCase().includes(search.toLowerCase()))
      ) &&
      (dataFiltered.status_filtered === "Todos" || order.status === dataFiltered.status_filtered)
    );
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredOrders.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredOrders.length / itemsPerPage));
  }, [itemOffset, orders, search, itemsPerPage, dataFiltered]);


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


  if (Object.keys(orders).length === 0) {
    return <Loader
    type="pedidos registrados"    
    />;
  }

  return (
    <>
      <div className="grid grid-cols-2 flex-wrap items-center mx-auto">
        <select
        name="status_filtered"
        onChange={handleFilter}
         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64">
        {statusFiltered.map((status) => (
              <option key={status.id} value={status.name}> {
                status.name
              }</option>))}
        </select>
        <div className="col-span-1 grid grid-cols-3 gap-2">
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
              Nombre
            </th>

            <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
              Cantidad
            </th>
            <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
              Valor en pesos
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
            <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
              Estado
            </th>
            <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900 text">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="text-center" >
          <OrdersList orders={currentItems}/>
          

        </tbody>
      </table>

      
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
  );
};

export default OrdersTable;
