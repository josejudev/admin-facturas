import {
    useState,
    useEffect,
    Loader,
    ReactPaginate,
    SkeletonLoader,
    useDispatch,
    useSelector,
    fetchOrders,
    handleModalDelete
} from '../../exports/commonExports'

const OrdersT = () => {

    const statusFiltered = [
        { id: 1, name: "Todos" },
        { id: 2, name: "Activo" },
        { id: 3, name: "Inactivo" },
    ];

    const dispatch = useDispatch()

    const {data, loading, error}= useSelector((state) => state.orders)

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



    
  return (
    <div>
      
    </div>
  )
}

export default OrdersT
