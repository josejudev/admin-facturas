import {
  useState,
  useEffect,
  Loader,
  ReactPaginate,
  SkeletonLoader,
  useDispatch,
  useSelector,
  fetchOrders,
  handleModalDelete,
  handleModalOrderEdit
} from '../../exports/commonExports'

const OrdersT = () => {

  const statusFiltered = [
    { id: 1, name: "Todos" },
    { id: 2, name: "Activo" },
    { id: 3, name: "Inactivo" },
  ];

  const dispatch = useDispatch()

  const { data, loading, error } = useSelector((state) => state.orders)

  const [currentItems, setCurrentItems] = useState([]);
  const [dataFiltered, setDataFiltered] = useState({
    status_filtered: statusFiltered[0].name,
  });
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(5);
  const itemsPerPage = perPage;


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

  useEffect(() => {
    if (data.length === 0 && !loading) {
      dispatch(fetchOrders());
    } else {
      // Filter data based on search value
      const filteredOrders = data.filter((order) =>
        (
          search === "" || ['entity'
          ].some((key) => order[key].toLowerCase().includes(search.toLowerCase()))

        ) && (dataFiltered.status_filtered === "Todos" || order.status === dataFiltered.status_filtered)
      );

      // Slice data based on current offset and itemsPerPage
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(filteredOrders.slice(itemOffset, endOffset));

      // Calculate pageCount based on filtered data
      setPageCount(Math.ceil(filteredOrders.length / itemsPerPage));
    }
  }, [data, itemOffset, itemsPerPage, search, dispatch, dataFiltered]);

  if (data.length === 0) return <Loader table="pedidos registrados" />;
  if (loading) return <SkeletonLoader />;
  if (error) return <div>Error: {error}</div>;




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
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="table p-4 mt-10 bg-white rounded-lg shadow table-auto w-full">
                <thead>
                  <tr>
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
                      Entidad
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
                  {currentItems.map((order) => (
                    <tr key={order.id}>
                      <td className="border-b-2 p-4">{order.date}</td>
                      <td className="border-b-2 p-4">{order.name}</td>
                      <td className="border-b-2 p-4">
                        {order.currency === "US" ? "$" + order.amount : "€" + order.amount}
                      </td>
                      <td className="border-b-2 p-4">{order.final_amount}</td>
                      <td className="border-b-2 p-4">{order.type}</td>
                      <td className="border-b-2 p-4">{order.class_type}</td>
                      <td className="border-b-2 p-4">{order.offer_id}</td>
                      <td className="border-b-2 p-4">
                        <a
                          href={`/uploads/${order.offer.fileName}`}
                          alt="alt text"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 "
                        >
                          {order.offer.project_name}
                        </a>
                      </td>

                      <td className="border-b-2 p-4">
                        <a
                          href={`/uploads/${order.fileName}`}
                          alt="alt text"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 "
                        >
                          {order.fileName}
                        </a>
                      </td>
                      <td className="border-b-2 p-4">{order.entity}</td>

                      <td className="border-b-2 p-4">
                        {order.status === "Activo" ? (
                          <span className="border border-green-200 text-green-500 font-medium  shadow-lg shadow-green-300/10 px-4 py-0.5 rounded">
                            {order.status}
                          </span>
                        ) : order.status === "Cerrado" ? (
                          <span className="border border-red-200 text-red-500 font-medium  shadow-lg shadow-red-300/10 px-4 py-0.5 rounded">
                            {order.status}
                          </span>
                        ) : null}
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
                                    type="button"
                                    className="block px-4 py-2 hover:bg-gray-100 text-cyan-600 w-full"
                                    onClick={() => {
                                      dispatch(handleModalOrderEdit(
                                        order.id,
                                      ));
                                    }}
                                  >
                                    Editar
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() => {
                                      dispatch(handleModalDelete(
                                        order.id,
                                      ));
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

export default OrdersT
