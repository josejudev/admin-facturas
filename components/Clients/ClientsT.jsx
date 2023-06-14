import { useState, useEffect, Loader, ReactPaginate, SkeletonLoader, useDispatch, useSelector, fetchClients, handleModalClientEdit, handleModalDelete, fetchUser } from '../../exports/commonExports';
import XLSX from 'xlsx';
import { ItemsPage, XlsxExport } from '../Buttons/HeaderTable';


const ClientsT = () => {




    // access the user object from the state using the useSelector hook


    const statusFiltered = [
        { id: 1, name: "Todos" },
        { id: 2, name: "Activo" },
        { id: 3, name: "Inactivo" },
    ];

    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch the fetchUser action creator on page load
        dispatch(fetchUser());
    }, [dispatch]);



    const user = useSelector((state) => state.users.data);
    const admin = user.role_id === 1 ? true : false;

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

    const XLSX = require('xlsx');

    const exportToExcel = () => {
        // Create a new workbook
        const workbook = XLSX.utils.book_new();
        const columnTitles = [
            "Nombre/Razón Social",
            "RFC",
            "Dirección Fiscal",
            "Dirección",
            "Correo",
            "Nombre de Contacto",
            "Teléfono de Contacto",
            "Correo de Contacto",
            "Estatus",
        ]

        const sheetData = [columnTitles]
        sheetData.push(...currentItems.map((client) => [
            client.name,
            client.rfc,
            client.fiscal_address,
            client.address,
            client.email,
            client.contact_name,
            client.contact_phone,
            client.contact_email,
            client.status,
        ]))

        const sheet = XLSX.utils.aoa_to_sheet(sheetData);

        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, sheet, 'Hoja 1');
        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, 'Clientes.xlsx');


    }



    if (data.length === 0) return <Loader table={"clientes registrados"} />;
    if (error) return <div><p>Error: {error.message}</p></div>;
    if (loading) return <SkeletonLoader />;




    return (
        <>
            <div className="flex items-center mx-auto justify-center w-full gap-2">
                <div className="flex justify-center items-center gap-2 flex-row md:flex-row">

                    <input
                        type="text"
                        name="search"
                        onChange={(e) => setSearch(e.target.value)}

                        placeholder="Buscar"
                        className="placeholder-gray-500 border-solid border-2 border-gray-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 bg-white rounded-lg h-11 p-1 w-full"
                    />
                    <select name="status_filtered" onChange={
                        handleFilter
                    } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-34">
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
                                                                className=" border-2 shadow-lg bg-white invisible border-gray-100 rounded w-[7rem] absolute left-2 bottom-1 transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1 z-10"
                                                            >
                                                                <ul >
                                                                    <li>
                                                                        <button
                                                                            onClick={() => {
                                                                                dispatch(
                                                                                    handleModalClientEdit(
                                                                                        client.id,
                                                                                    ))

                                                                            }}
                                                                            type="button"
                                                                            className="px-4 py-2 hover:bg-cyan-50 text-cyan-600 w-full flex justify-center"
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
                                                                                        dispatch(handleModalDelete(client.id))
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

export default ClientsT
