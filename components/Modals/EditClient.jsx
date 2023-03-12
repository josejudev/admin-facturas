import useAdmin from "../../hooks/useAdmin";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditClient = () => {
  const status = [
    { id: 1, name: "Activo" },
    { id: 2, name: "Inactivo" },
  ];



  const { client, handleModalEditClient, editClientId } = useAdmin();
  const router = useRouter();
  const [editClient, setEditClient] = useState({
    name: client.name,
    rfc: client.rfc,
    fiscal_address: client.fiscal_address,
    email: client.email,
    address: client.address,
    contact_phone: client.contact_phone,
    contact_name: client.contact_name,
    contact_email: client.contact_email,
  });

  const handleStatus = ({ target: { name, value } }) => {
    setEditClient({
      ...editClient,
      [name]: value,
    });
    console.log(editClient);
    
  };


  const handleChange = ({ target: { name, value } }) => {
    setEditClient({
      ...editClient,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, rfc, fiscal_address, email, address, contact_phone, contact_email, contact_name,status } = e.target.elements;
      await editClientId(
        client.id,
        name.value,
        rfc.value,
        fiscal_address.value,
        email.value,
        address.value,
        contact_phone.value,
        contact_email.value,
        contact_name.value,
        status.value,
      );
      handleModalEditClient();
      router.push("/clientes");
      toast.success("Client edited successfully");
    } catch (err) {
      toast.error("Error editing client");
    }
  }

  return (
    <div className="w-[900px] flex flex-col">
      <div className="grid grid-cols-2  px-8 pt-6">
        <h1 className="text-4xl font-bold text-blue-700">Editar Cliente</h1>
        <div className="flex justify-end">
          <button
            onClick={handleModalEditClient}
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
      <form method="POST" onSubmit={handleSubmit}>
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
                value={editClient.name}
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
                value={editClient.rfc}
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
                value={editClient.fiscal_address}
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
                value={editClient.email}
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
                value={editClient.address}
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
                value={editClient.contact_name}
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
                value={editClient.contact_phone}
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
                value={editClient.contact_email}
                name="contact_email"
                type="text"
              />
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
              defaultValue={client.status}
              className="text-center appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-1/3  px-4 focus:border-blue-500 block py-3.5 mb-3 "


            >
              {status.map((state) => (
                <option key={state.id} value={state.name}>
                  {state.name}
                </option>
              ))}


            </select>
          </div>

          <div className="-mx-3 md:flex mt-3 justify-center ">
            <div className="md:w-1/2 px-3 mt-3 md:mb-0 flex justify-center">

              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-16 py-2.5 mb-3 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Actualizar Datos
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditClient;
