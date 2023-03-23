import { useState, useEffect, Loader, ReactPaginate, SkeletonLoader, useDispatch, useSelector, fetchClients, handleModalClientEdit } from '../../exports/commonExports';

const ClientsT = () => {
    const statusFiltered = [
        { id: 1, name: "Todos" },
        { id: 2, name: "Activo" },
        { id: 3, name: "Inactivo" },
    ];

    const dispatch = useDispatch();

    const { data, loading, error } = useSelector((state) => state.clients);

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
            dispatch(fetchClients());
        } else {
            // Filter data based on search value
            const filteredData = data.filter((item) =>
                (
                    search === "" || ['name', 'rfc', 'fiscal_address', 'address', 'email', 'contact_name', 'contact_phone', 'contact_email'].some((key) => item[key].toLowerCase().includes(search.toLowerCase()))

                ) && (dataFiltered.status_filtered === "Todos" || item.status === dataFiltered.status_filtered)
            );

            // Slice data based on current offset and itemsPerPage
            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(filteredData.slice(itemOffset, endOffset));

            // Calculate pageCount based on filtered data
            setPageCount(Math.ceil(filteredData.length / itemsPerPage));
        }
    }, [data, itemOffset, itemsPerPage, search, dispatch, dataFiltered]);



    if (data.length === 0) return <Loader table={"clientes registrados"} />;
    if (error) return <div><p>Error: {error.message}</p></div>;
    if (loading) return <SkeletonLoader />;




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

                    <select
                        value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64">
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
                                    {

                                        currentItems.map((client) => (
                                            <tr key={client.id} className="text-gray-700">
                                                <td className="border-b-2 p-4">{client.name}</td>
                                                <td className="border-b-2 p-4">{client.rfc}</td>
                                                <td className="border-b-2 p-4">{client.fiscal_address}</td>
                                                <td className="border-b-2 p-4">{client.address}</td>
                                                <td className="border-b-2 p-4">{client.email}</td>
                                                <td className="border-b-2 p-4">{client.contact_name}</td>
                                                <td className="border-b-2 p-4">{client.contact_phone}</td>
                                                <td className="border-b-2 p-4">{client.contact_email}</td>
                                                <td className="border-b-2 p-4">
                                                    {client.status === "Activo" ? <span className="border border-green-200 text-green-500 font-medium  shadow-lg shadow-green-300/10 px-4 py-0.5 rounded">{client.status}</span> : <span className="border border-red-200 text-red-500 font-medium  shadow-lg shadow-red-300/10 px-4 py-0.5 rounded">{client.status}</span>}


                                                </td>

                                                <td className="border-b-2 p-4">
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
                                                                                dispatch(
                                                                                    handleModalClientEdit(
                                                                                        client.id,
                                                                                    ))

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
                                                                                handleSetClient(client);
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

export default ClientsT
