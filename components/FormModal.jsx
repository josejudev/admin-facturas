import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";


const FormModal = () => {
  const [client, setClient] = useState({
    name: "",
    rfc: "",
  fiscal_address: "",
    address: "",
    email: "",
    contact_phone: "",
    contact_email: "",
  });

  const router = useRouter();

  const handleChange = ({ target: { name, value } }) => {
    setClient({
      ...client,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/clients", client);
      
    } catch (error) {
      console.log(error);
    }
 
  };

  return (
    <div>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-first-name"
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
                for="grid-rfc"
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
                for="grid-dirfis"
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
                for="grid-email"
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
                for="grid-direccion"
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
                for="grid-phone"
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
                for="grid-email"
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

export default FormModal;
