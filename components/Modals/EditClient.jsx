import {
  useState, useEffect, useRouter,
  axios, toast, useDispatch,
  updateClient, handleModalClientEdit,
  Input, InputField, useForm
} from '../../exports/commonExports';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-number-input/style.css'



const EditClient = ({ clientId }) => {
  const status = [
    { id: 1, name: "Activo" },
    { id: 2, name: "Inactivo" },
  ];

  const dispatch = useDispatch();
  const router = useRouter();
  const [phoneValue, setPhoneValue] = useState()
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const [editClient, setEditClient] = useState(
    {
      name: "loading...",
      status: "loading...",
      rfc: "loading...",
      fiscal_address: "loading...",
      email: "loading...",
      address: "loading...",
      contact_phone: "loading...",
      contact_name: "loading...",
      contact_email: "loading...",

    }
  );

  const handleStatus = ({ target: { name, value } }) => {
    setEditClient({
      ...editClient,
      [name]: value,
    });
  };


  const handleChange = ({ target: { name, value } }) => {
    setEditClient({
      ...editClient,
      [name]: value,
    });
  }

  const handlePhone = (e) => {
    setEditClient({
      ...editClient,
      contact_phone: e,
    });
  }

  useEffect(() => {
    const getClient = async () => {
      const { data } = await axios.get(
        `/api/clients/${clientId}`
      );
      setEditClient(data);
    };
    getClient();
  }, [clientId])

  const onSubmit = async () => {
    try {
      dispatch(updateClient(editClient, editClient.id))
      dispatch(handleModalClientEdit())
      toast.success("Client edited successfully");

    } catch (err) {
      toast.error("Error editing client");
    }
  }



  return (
    <div className=" flex flex-col sm:overflow-hidden xl:w-full md:w-[750px] sm:w-[480px]">
      <div className="flex justify-between  px-8 ">
        <h1 className="sm:text-2xl text-4xl md:text-4xl font-bold text-teal-500">Editar Cliente</h1>
        <div className="flex justify-end">
          <button
            onClick={
              () => {
                dispatch(
                  handleModalClientEdit()
                );
              }
            }
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
      <form method="POST" onSubmit={handleSubmit(
        onSubmit
      )}>
        <div className=" rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <InputField
              label="Nombre / Razón Social"
              name="name"
              register={register}
              errors={errors}
              value={editClient?.name}
              onChange={handleChange}
              required
              />
              {
                errors.name && (<span className="text-red-500 text-xs italic">Este campo es requerido</span>)
              }
            </div>
            <div className="md:w-1/2 px-3">
              <InputField
              label="RFC"
              name="rfc"
              register={register}
              errors={errors}
              value={editClient?.rfc}
              onChange={handleChange}
              required
              />
              {
                errors.rfc && (<span className="text-red-500 text-xs italic">Este campo es requerido</span>)
              }
            </div>
          </div>

          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <InputField
              label="Dirección Fiscal"
              name="fiscal_address"
              register={register}
              errors={errors}
              value={editClient?.fiscal_address}
              onChange={handleChange}
              required
              />
              {
                errors.fiscal_address && (<span className="text-red-500 text-xs italic">Este campo es requerido</span>)
              }
            </div>
            <div className="md:w-1/2 px-3">
              <InputField
              label="Correo Electrónico"
              name="email"
              register={register}
              errors={errors}
              value={editClient?.email}
              onChange={handleChange}
              required
              />
              {
                errors.email && (<span className="text-red-500 text-xs italic">Este campo es requerido</span>)
              }
            </div>
          </div>

          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-full px-3">
            <InputField
              label="Dirección"
              name="address"
              register={register}
              errors={errors}
              value={editClient?.address}
              onChange={handleChange}
              required
              />
              {
                errors.address && (<span className="text-red-500 text-xs italic">Este campo es requerido</span>)
              }
            </div>
          </div>

          <p className="text-gray-700 text-xl font-bold mb-2">
            Persona de contacto
          </p>

          <div className="-mx-3 md:flex mb-2">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <InputField
              label="Nombre"
              name="contact_name"
              register={register}
              errors={errors}
              value={editClient?.contact_name}
              onChange={handleChange}
              required
              />
              {
                errors.contact_name && (<span className="text-red-500 text-xs italic">Este campo es requerido</span>)
              }
            </div>


            <div className="md:w-1/2 px-3">
              <InputField
              label="Email"
              name="contact_email"
              register={register}
              errors={errors}
              value={editClient?.contact_email}
              onChange={handleChange}
              required
              />
              {
                errors.contact_email && (<span className="text-red-500 text-xs italic">Este campo es requerido</span>)
              }
            </div>
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-phone"
              >
                Telefono
              </label>
              <Input
                {...register("contact_phone")}
                value={editClient?.contact_phone}
                onChange={handlePhone}
                className={
                  errors.contact_phone ? "transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-red-200 border border-red-300 appearance-none block w-full bg-grey-lighter text-grey-darker border-grey-lighter rounded py-3 px-4" : "appearance-none block w-full bg-grey-lighter text-grey-darker border border-red-500-lighter rounded py-3 px-4 mb-3"
                }
              />
              {
                errors.contact_phone && <span className="text-red-500 text-xs italic">Este campo es requerido</span>
              }
            </div>

          </div>
          <div className="flex-col justify-center items-center  flex mt-2">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-client"
            >
              Status
            </label>
            <select
              onChange={handleStatus}
              name="status"
              className="text-center appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-1/3  px-4 focus:border-blue-500 block py-3.5 mb-3 "
              value={editClient?.status}
            >
              {status.map((state) => (
                <option key={state.id} value={state.name}>
                  {state.name}
                </option>
              ))}


            </select>
          </div>

          <div className=" md:flex mt-3 justify-end ">
            <div className="md:1/2 px-3 mt-3 md:mb-0 flex flex-row items-center justify-center gap-5">
              <button className="shadow-md shadow-teal-500/10 border border-teal-500 text-teal-500 hover:bg-teal-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-16 py-2.5 mb-3 text-center inline-flex items-center w-1/2 justify-center">
                Guardar
              </button>
              <button
                onClick={() => {
                  dispatch(handleModalClientEdit())
                }}
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

export default EditClient;
