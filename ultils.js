  const [checkedIds, setCheckedIds] = useState([]);
    
    
    
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

                    <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                      "
                      />
                    </th>


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