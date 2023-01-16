import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import useAdmin from "../hooks/useAdmin";

const OfferModal = () => {
  const [offer, setOffer] = useState({
    project_name: "",
    fileName: "",
    final_client: "",
    client_id: 1,
  });
  const { clients } = useAdmin();

  const router = useRouter();

  const handleChange = ({ target: { name, value } }) => {
    setOffer({
      ...offer,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/offers", offer);
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
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
                onChange={handleChange}
                id="project-name"
                name="project_name"
                type="text"
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
              <select onChange={
                handleChange
              } name="client_id" className="text-center appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full  px-4 focus:border-blue-500 block py-3.5 mb-3 ">
                {
                  // Aqui va el map de los clientes
                  clients.map((client) => (
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
                onChange={handleChange}
                id="final-client"
                name="final_client"
                type="text"
              />
            </div>
          </div>

          <div className=" md:flex mb-6">
            <div className="md:w-full px-3 border-dashed border-2 border-indigo-200 hover:border-indigo-500 flex flex-col justify-center items-center  w-1/2 p-8">
              <span className=" block text-sm text-center text-slate-400 font-semibold mb-2">
                Arrastre y suelte el archivo aqui
              </span>
              <button className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                Subir archivo
              </button>
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

export default OfferModal;
