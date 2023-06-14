import { handleModalOffer, useState, useRouter, toast, useDispatch, useSelector, useEffect, fetchClients, addOffer, fetchOffers } from '../../exports/commonExports'
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';
import InputField from '../InputFields';
import ActionsButtons from '../ActionsButtons';
import { useForm } from 'react-hook-form';

const customStyles = {


  /*
  *Estilos del input search del cliente
  */
  control: (provided, state) => ({
    ...provided,
    borderRadius: 5,
    height: 62,
    borderColor: state.isFocused ? 'black' : '#d1d5db',
    boxShadow: state.isFocused ? '0 0 0 1px #aaa' : null,
    '&:hover': {
      borderColor: state.isFocused ? 'black' : 'none'
    }
  }),

};

const AddOffer = () => {

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const router = useRouter();
  const [fileName, setFileName] = useState(null);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);
  const dataFiltered = data.filter((client) => client.status === "Activo")

  const [offer, setOffer] = useState({
    project_name: "",
    fileName: "",
    final_client: "",
    activity_resumen: "",
    client_id: "",
  });




  const handleChange = ({ target: { name, value } }) => {
    setOffer({
      ...offer,
      [name]: value,
    });
  };


  const handleClient = (selectedOption) => {
    if (selectedOption) {
      setOffer({
        ...offer,
        client_id: selectedOption.value,
      });

      // Set the selected value to the 'client_id' field using setValue
      setValue("client_id", selectedOption.value);
    }
  }

  const handleFile = ({ target: { name, files } }) => {
    setOffer({
      ...offer,
      [name]: files[0],
    });
  };


  const handleSubmitForm = async (data) => {
    try {
      dispatch(addOffer(data));
      dispatch(fetchOffers());
      dispatch(handleModalOffer());
      toast.success("Oferta agregada exitosamente");

    } catch (error) {
      toast.error("Error al agregar oferta");
    }
  }

  const isDisabled = !watch("client_id");

  return (
    <div className="md:w-[750px] flex flex-col sm:w-[550px] sm:overflow-hidden ">
      <div className="flex justify-between px-8">
        <h1 className="md:text-4xl text-2xl font-bold text-teal-500">Agregar oferta</h1>
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

      <form onSubmit={
        handleSubmit(handleSubmitForm)
      } encType="multipart/form-data">
        <div className="rounded px-8 pt-6  flex flex-col ">
          <div className="-mx-3 md:flex ">
            <div className="md:w-full px-3">
              <InputField
                label="Nombre del proyecto"
                name="project_name"
                register={register}
                errors={errors}
                onChange={handleChange}
                required
              />
              {
                errors.project_name && <span className="text-red-500 text-sm">Este campo es requerido</span>
              }
            </div>
          </div>
          <div className="-mx-3 md:flex ">
            <div className="md:w-1/2 px-3 ">
              <label
                className="block text-grey-darker text-sm font-bold mb-2 text-slate-700"
                htmlFor="grid-client"
              >
                Cliente
              </label>
              <Select
                key={dataFiltered.id}
                styles={customStyles}
                placeholder=""
                {...register("client_id", {
                  required: true,
                })} // Register 'client_id' field with react-hook-form
                onChange={handleClient}
                options={dataFiltered.map((client) => {
                  return { value: client.id, label: client.name };
                })}
              />
              {
                errors.client_id && <span className="text-red-500 text-sm">Este campo es requerido</span>
              }

            </div>
            <div className="md:w-1/2 px-3">
              <InputField
                label="Cliente final"
                name="final_client"
                register={register}
                errors={errors}
                onChange={handleChange}
                required
              />
              {
                errors.final_client && <span className="text-red-500 text-sm">Este campo es requerido</span>
              }
            </div>
          </div>

          <div className=" md:flex mb-3  items-center justify-center">
            <div className="md:w-1/2 px-3 m-3">
              <InputField
                label="Resumen de la actividad"
                name="activity_resumen"
                register={register}
                errors={errors}
                onChange={handleChange}
                required
              />
              {
                errors.activity_resumen && <span className="text-red-500 text-sm">Este campo es requerido</span>
              }
            </div>
          </div>

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-50 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
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
                <p className="mb-2 text-sm text-gray-500 ">
                  <span className="font-semibold">
                    Click para agregar archivo
                  </span>{" "}
                  o arrastra y suelta
                </p>
                <p className="text-xs text-gray-500 ">
                  *Solo archivos PDF
                </p>
              </div>
              <input
                id="dropzone-file"
                onChange={handleFile}
                {
                ...register("fileName", {
                  required: true,
                })
                }
                type="file"
                accept="application/pdf"
                className="hidden"
              />


            </label>

          </div>
          {
            errors.fileName && <span className="text-red-500 text-sm">Favor de subir el archivo correspondiente</span>
          }

          <div className=" md:flex mt-3 justify-end ">
            <div className="md:w-1/2 px-3  md:mb-0 flex flex-row items-center justify-center gap-5">
            <ActionsButtons isDisabled={isDisabled}/>
              <button
                onClick={
                  () => {
                    dispatch(handleModalOffer())
                  }
                }
                className="shadow-md shadow-red-500/10 border border-red-500 text-red-500  hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-semibold rounded-lg text-sm px-16 py-2.5 mb-3 text-center inline-flex items-center w-1/2 justify-center">
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
