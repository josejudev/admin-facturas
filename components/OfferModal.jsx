import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import useAdmin from "../hooks/useAdmin";
import { set } from "date-fns";

const OfferModal = () => {
  const { clients } = useAdmin();
  const [fileName, setFileName] = useState(null);
  const [offer, setOffer] = useState({
    project_name: "",
    fileName: "",
    final_client: "",
    activity_resumen: "",
    client_id: 1,
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
    const body = new FormData();
    body.append("fileName", fileName);
    body.append("project_name", offer.project_name);
    body.append("final_client", offer.final_client);
    body.append("activity_resumen", offer.activity_resumen);
    body.append("client_id", offer.client_id);
    const response = await fetch("/api/example/", {
      method: "POST",
      body,
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
              <select
                onChange={handleChange}
                name="client_id"
                className="text-center appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full  px-4 focus:border-blue-500 block py-3.5 mb-3 "
              >
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
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0 mx-auto">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="project-activity"
              >
                Resumen de actividad
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                onChange={handleChange}
                id="project-activity"
                name="activity_resumen"
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
                  <span className="font-semibold">Click para subir</span> o
                  arrastra y suelta
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  *Solo archivos PDF
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                onChange={handleFile}
                name="fileName"
              />
            </label>
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
