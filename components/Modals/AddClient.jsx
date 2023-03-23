import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addClient } from '../../redux/clients/clientSlice';
import { handleModalClient } from "../../redux/modals/modalSlice";
import 'react-toastify/dist/ReactToastify.css';

const AddClient = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm();

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


  const handleChange = ({ target: { name, value } }) => {
    setClient({
      ...client,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    try {
      dispatch(addClient(client));
      dispatch(handleModalClient());
      router.push('/clientes')
      toast.success("Client added successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-[900px] flex flex-col">
      <div className="grid grid-cols-2  px-8 pt-6">
        <h1 className="text-4xl font-bold text-blue-700">Agregar Cliente</h1>
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
        <div className=" rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Nombre / Razón Social
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                onChange={handleChange}
                id="grid-first-name"
                name="name"
                type="text"
              />
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-rfc"
              >
                RFC
              </label>
              <input
                maxLength={15}
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                onChange={handleChange}
                id="grid-rfc"
                name="rfc"
                type="text"
              />
            </div>
          </div>

          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-dirfis"
              >
                Direccion Fiscal
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                onChange={handleChange}
                id="grid-dirfis"
                type="text"
                name="fiscal_address"
              />
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-email"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                onChange={handleChange}
                id="grid-email"
                name="email"
                type="text"
              />
            </div>
          </div>

          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-full px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-direccion"
              >
                Dirección
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                onChange={handleChange}
                id="grid-direccion"
                name="address"
                type="text"
              />
            </div>
          </div>

          <p className="text-gray-700 text-xl font-bold mb-2">
            Persona de contacto
          </p>
          <div className="-mx-3 md:flex mb-2">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-phone"
              >
                Nombre
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                onChange={handleChange}
                id="grid-phone"
                name="contact_name"
                type="text"
              />
            </div>
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-phone"
              >
                Telefono
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                onChange={handleChange}
                id="grid-phone"
                name="contact_phone"
                type="text"
              />
            </div>

            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-email"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                onChange={handleChange}
                id="grid-email"
                name="contact_email"
                type="text"
              />
            </div>
          </div>
          <div className="-mx-3 md:flex mt-3 justify-center ">
            <div className="md:w-1/2 px-3 mt-3 md:mb-0 flex justify-center">
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-16 py-2.5 mb-3 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Agregar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddClient;
