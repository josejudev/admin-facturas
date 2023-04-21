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
  handleModalOrderEdit,
  fetchUser
} from '../../exports/commonExports'
import XLSX from 'xlsx';
import { ItemsPage, XlsxExport } from '../Buttons/HeaderTable';

const OrdersT = () => {

  const statusFiltered = [
    { id: 1, name: "Todos" },
    { id: 2, name: "Activo" },
    { id: 3, name: "Inactivo" },
  ];

  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch the fetchUser action creator on page load
    dispatch(fetchUser());
  }, [dispatch]);





  const { data, loading, error } = useSelector((state) => state.orders)
  const user = useSelector((state) => state.users.data);
  const admin = user.role_id === 1 ? true : false;

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
          search === "" || ['date', 'name', 'amount', 'final_amount', 'order_balance', 'type', 'concept', 'class_type', 'entity', 'status', 'fileName'].some(key => order[key].toString().toLowerCase().includes(search.toLowerCase())
            || order.offer.project_name.toLowerCase().includes(search.toLowerCase())
          )

        ) && (dataFiltered.status_filtered === "Todos" || order.status === dataFiltered.status_filtered)
      );

      // Slice data based on current offset and itemsPerPage
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(filteredOrders.slice(itemOffset, endOffset));

      // Calculate pageCount based on filtered data
      setPageCount(Math.ceil(filteredOrders.length / itemsPerPage));
    }
  }, [data, itemOffset, itemsPerPage, search, dispatch, dataFiltered]);

  const XLSX = require('xlsx');
  const exportToExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Add column titles
    const columnTitles = [
      'Fecha del pedido',
      'Nombre',
      'Cantidad',
      'Valor en pesos',
      'Saldo',
      'Tipo',
      'Concepto',
      'Clase',
      'Entidad',
      'Estado',


    ];
    const sheetData = [columnTitles]; // Include column titles as the first row
    sheetData.push(...currentItems.map(order => [
      order.date,
      order.name,
      order.amount,
      order.final_amount,
      order.order_balance,
      order.type,
      order.concept,
      order.class_type,
      order.entity,
      order.status,

    ]));

    // Create a worksheet from the sheet data
    const sheet = XLSX.utils.aoa_to_sheet(sheetData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, sheet, 'Hoja 1');

    // Save the workbook as an Excel file
    XLSX.writeFile(workbook, 'Pedidos.xlsx');
  };


  if (data.length === 0) return <Loader table="pedidos registrados" />;
  if (loading) return <SkeletonLoader />;
  if (error) return <div>Error: {error}</div>;




  return (
    <>
      <div className="flex items-center mx-auto justify-center w-full">
        <div className="flex justify-center items-center gap-2 flex-col sm:flex-row">
          <input
            type="text"
            name="search"
            placeholder="Buscar"
            onChange={(e) => setSearch(e.target.value)}
            className=" placeholder-gray-500 border-solid border-2 border-gray-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 bg-white rounded-lg h-11 p-1"
          />
          <select
            name="status_filtered"
            onChange={handleFilter}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-30">
            {statusFiltered.map((status) => (
              <option key={status.id} value={status.name}> {
                status.name
              }</option>))}
          </select>
          <ItemsPage perPage={perPage} setPerPage={setPerPage} />
          <XlsxExport exportToExcel={exportToExcel} />

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
                      Saldo
                    </th>
                    <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                      Tipo
                    </th>
                    <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                      Concepto
                    </th>
                    <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                      Clase
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
                      <td className="border-b-2 p-4">{order.currency + " " + order.amount}</td>
                      <td className="border-b-2 p-4">{`MXN ${order.final_amount}`}</td>
                      <td className="border-b-2 p-4">{order.order_balance}</td>
                      <td className="border-b-2 p-4">{order.type}</td>
                      <td className="border-b-2 p-4">{order.concept}</td>
                      <td className="border-b-2 p-4">{order.class_type}</td>
                      <td className="border-b-2 p-4">
                        <a
                          href={`/uploads/${order.offer?.fileName}`}
                          alt="alt text"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 "
                        >
                          {order.offer?.project_name}
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
                              className=" border-2 shadow-lg bg-white invisible border-gray-100 rounded w-[7rem] absolute left-2 bottom-1 transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1 z-10"
                            >
                              <ul>
                                <li>
                                  <button
                                    type="button"
                                    className="px-4 py-2 hover:bg-cyan-50 text-cyan-600 w-full flex justify-center"
                                    onClick={() => {
                                      dispatch(handleModalOrderEdit(
                                        order.id,
                                      ));
                                    }}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                  </button>
                                </li>
                                {
                                  admin && (
                                    <li>
                                      <button
                                        onClick={() => {
                                          dispatch(handleModalDelete(
                                            order.id,
                                          ));
                                        }}
                                        type="button"
                                        className="px-4 py-2 flex justify-center  hover:bg-red-50 text-red-600 w-full"
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                      </button>
                                    </li>
                                  )
                                }
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
