import {
  useState,
  useRouter,
  toast,
  useForm,
  useDispatch,
  addClient,
  handleModalClient,
  Input,
  InputField,
} from '../../exports/commonExports';

import 'react-phone-number-input/style.css'
import 'react-toastify/dist/ReactToastify.css';

const AddClient = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [phoneValue, setPhoneValue] = useState()
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const [client, setClient] = useState({
    name: "",
    rfc: "",
    fiscal_address: "",
    address: "",
    email: "",
    contact_phone: "",
    contact_email: "",
    contact_name: "",
  });

  const handlePhone = (e) => {
    setClient({
      ...client,
      contact_phone: e,
    });
  }


  const handleChange = ({ target: { name, value } }) => {
    setClient({
      ...client,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    try {
      dispatch(addClient(client));
      dispatch(handleModalClient());
      router.push('/clientes')
      toast.success("Cliente agregado con éxito");
    } catch (err) {
      toast.error("Error al agregar cliente");
        }
  };

  const isDisabled = !watch("name") || !watch("rfc") || !watch("fiscal_address") || !watch("address") || !watch("email") || !watch("contact_email") || !watch("contact_name");

  return (
    <div className=" flex flex-col sm:overflow-hidden xl:w-full md:w-[750px] sm:w-[480px] ">
      <div className="flex justify-between  px-8 ">
        <h1 className="sm:text-2xl text-4xl md:text-4xl font-bold text-teal-500">Agregar Cliente</h1>
        <div className="flex justify-end">
          <button
            onClick={
              () => {
                dispatch(
                  handleModalClient()
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
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <div className=" rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 ">
          <div className="-mx-3 sm:flex flex md:flex ">
            <div className="sm:w-1/2 w-1/2 md:w-1/2 px-3">
              <InputField
                label="Razón Social"
                name="name"
                register={register}
                errors={errors}
                onChange={handleChange}
                required
              />
              
              {
                errors.name && <span className="text-red-500 text-xs italic">Campo obligatorio</span>
              }
            </div>
       
            <div className="sm:w-1/2 w-1/2 px-3">
              <InputField
                label="RFC"
                name="rfc"
                register={register}
                minLength={12}
                maxLength={13}
                errors={errors}
                onChange={handleChange}
                pattern={/^[a-zA-Z0-9]+$/}
                required />
              {
                errors.rfc?.type === "maxLength" || errors.rfc?.type === "minLength" ? <span className="text-red-500 text-xs italic">
                  El RFC debe tener 12 o 13 caracteres
                </span> : errors.rfc?.type === "pattern" ? <span className="text-red-500 text-xs italic"> El RFC no debe contener espacios ni caracteres especiales</span> : errors.rfc && <span className="text-red-500 text-xs italic">Campo obligatorio</span>
              }
            </div>
          </div>

          <div className="-mx-3 md:flex flex">
            <div className="md:w-1/2 px-3">
              <InputField
                label="Dirección Fiscal"
                name="fiscal_address"
                register={register}
                errors={errors}
                onChange={handleChange}
                required />
              {
                errors.fiscal_address && <span className="text-red-500 text-xs italic">Campo obligatorio</span>
              }
            </div>
            <div className="md:w-1/2 px-3">
              <InputField
                label="Email"
                name="email"
                register={register}
                errors={errors}
                onChange={handleChange}
                type="email"
                pattern={/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/}
                required />
                {
                errors.email?.type === "pattern" ? <span className="text-red-500 text-xs italic">El email no es válido</span> : errors.email && <span className="text-red-500 text-xs italic">Campo obligatorio</span>
                }
            </div>
          </div>

          <div className="-mx-3 md:flex ">
            <div className="md:w-full px-3">
              <InputField
                label="Dirección"
                name="address"
                register={register}
                errors={errors}
                onChange={handleChange}
                required />
              {
                errors.address && <span className="text-red-500 text-xs italic">Campo obligatorio</span>
              }
            </div>
          </div>

          <p className="text-gray-700 text-xl font-bold mb-2">
            Persona de contacto
          </p>
          <div className="-mx-3 md:flex">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <InputField
                label="Nombre"
                name="contact_name"
                register={register}
                errors={errors}
                onChange={handleChange}
                required />
              {
                errors.contact_name && <span className="text-red-500 text-xs italic">Campo obligatorio</span>
              }
            </div>

            <div className="md:w-1/2 px-3">
              <InputField
                label="Email"
                name="contact_email"
                register={register}
                errors={errors}
                onChange={handleChange}
                type="email"
                pattern={/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/}
                required />
              {
                errors.contact_email?.type === "pattern" ? <span className="text-red-500 text-xs italic">El email no es válido</span> : errors.contact_email && <span className="text-red-500 text-xs italic">Campo obligatorio</span>
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
              {
                ...register("contact_phone", {
                })
              }
                value={phoneValue}
                onChange={handlePhone}
                className={
                  errors.contact_phone ? "transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-red-200 border border-red-300 appearance-none block w-full bg-grey-lighter text-grey-darker border-grey-lighter rounded py-3 px-4" : "appearance-none block w-full bg-grey-lighter text-grey-darker border border-red-500-lighter rounded py-3 px-4 mb-3"
                }
                
              />
              {
                errors.contact_phone && <span className="text-red-500 text-xs italic">Campo obligatorio</span>
              }
            </div>


          </div>
          <div className=" md:flex mt-3 justify-end ">
            <div className="md:w-1/2 px-3 mt-3 md:mb-0 flex md:flex-row sm:flex-col items-center justify-center gap-5">
              <button 
              disabled={
                isDisabled
              }
              className="
              disabled:opacity-50
              disabled:hover:bg-transparent
              disabled:hover:text-gray-500
              disabled:hover:border-gray-500
              disabled:hover:shadow-none
              disabled:border-gray-500
              disabled:text-gray-500
              shadow-md shadow-teal-500/10 border border-teal-500 text-teal-500 hover:bg-teal-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-16 py-2.5 mb-3 text-center inline-flex items-center w-1/2 justify-center"
              >
                Agregar
              </button>

              
              <button
                onClick={() => {
                  dispatch(handleModalClient())
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

export default AddClient;
