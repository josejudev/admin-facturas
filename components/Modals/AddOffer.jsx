

import {handleModalOffer,useState,useRouter,toast,useDispatch,useSelector,useEffect,fetchClients,addOffer, fetchOffers} from '../../exports/commonExports'

import 'react-toastify/dist/ReactToastify.css';

const AddOffer = () => {
  const router = useRouter();
  const [fileName, setFileName] = useState(null);
  const dispatch = useDispatch();
  const {data} = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);
  const dataFiltered= data.filter((client) => client.status === "Activo" )



  


    const [offer, setOffer] = useState({
      project_name: "",
      fileName: "",
      final_client: "", 
      activity_resumen: "",
      client_id: dataFiltered[0].id,
    });
  



  const handleChange = ({ target: { name, value } }) => {
    setOffer({
      ...offer,
      [name]: value,
    });
  };

  const handleFile = (e) => {
    setFileName(e.target.files[0]);
    setOffer({
      ...offer,
      fileName: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { project_name, fileName, final_client, activity_resumen, client_id } = e.target.elements;
  
      const formData = {
        project_name: project_name.value,
        fileName: fileName.files[0], // use the first file in the FileList
        final_client: final_client.value,
        activity_resumen: activity_resumen.value,
        client_id: client_id.value
      };
       dispatch(addOffer(formData));
       dispatch(fetchOffers())
       dispatch(handleModalOffer());

      handleModalOffer(); 
      toast.success('Oferta creada con éxito');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-[900px] flex flex-col">
      <div className="grid grid-cols-2  px-8 pt-6">
        <h1 className="text-4xl font-bold text-blue-700">Agregar oferta</h1>
        <div className="flex justify-end">
          <button
            onClick={() => {
              dispatch(handleModalOffer());
            }}
            type="button"
            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span className="sr-only">Close menu</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="project-name"
              >
                Nombre del proyecto
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                id="project-name"
                name="project_name"
                type="text"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-client"
              >
                Cliente
              </label>
              <select
                onChange={handleChange}
                name="client_id"
                className="text-center appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full  px-4 focus:border-blue-500 block py-3.5 mb-3 "
                defaultValue={1}
              >
                {
                  // Aqui va el map de los clientes
                  dataFiltered?.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="final-client"
              >
                Cliente final
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                id="final-client"
                name="final_client"
                onChange={handleChange}
                type="text"
              />
            </div>
          </div>

          <div className=" md:flex mb-3  items-center justify-center">
            <div className="md:w-1/2 px-3 m-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-client"
              >
                Resumen de Actividad
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                id="final-client"
                name="activity_resumen"
                onChange={handleChange}
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-50 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">
                    Click para reemplazar archivo
                  </span>{" "}
                  o arrastra y suelta
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  *Solo archivos PDF
                </p>
              </div>
              <input
                id="dropzone-file"
                onChange={handleFile}
                type="file"
                className="hidden"
                name="fileName"
              />
            </label>
          </div>

          <div className=" md:flex mt-3 justify-center ">
            <div className="md:w-1/2 px-3 mt-3 md:mb-0 flex flex-col items-center justify-center">
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-16 py-2.5 mb-3 text-center inline-flex items-center w-1/2 justify-center">
                Agregar
              </button>
              <button 
              onClick={handleModalOffer}
              className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-semibold rounded-lg text-sm px-16 py-2.5 mb-3 text-center inline-flex items-center w-1/2 justify-center">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddOffer;
