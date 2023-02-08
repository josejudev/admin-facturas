import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

const Form_Order = () => {
  let [billAmount, setBillAmount] = useState("");
  let [exchange, setExchange] = useState("");
  let [currency, setCurrency] = useState("");

  return (
    <>
      <Layout title={"Nuevo Pedido"}>
        <form>
          {/*
        Primer container
         */}
          <div className=" my-5 flex md:flex md:flex-col-2 h-full ">
            <div className=" my-2 mx-2 h-full">
              <div className="min-[320px]:flex-col min-[320px]:w-11/12 md:flex-row container flex flex-wrap items-start justify-start mx-auto rounded-xl ">
                <h1 className="mt-4 min-[320px]:text-2xl font-semibold text-blue-500 md:text-4xl">
                  Agregar nuevo pedido
                </h1>
              </div>

              <div className="min-[320px]:flex-col min-[320px]:w-11/12 md:flex-row container flex flex-wrap items-center justify-center mx-auto bg-white p-5 rounded-xl mt-5 gap-8">
                <label className="block">
                  <span className="block text-sm font-medium text-slate-700">
                    Fecha del pedido
                  </span>
                  <input
                    type="date"
                    name="date"
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
                  />
                </label>
                <label className="block">
                  <span className=" block text-sm font-medium text-slate-700">
                    Nombre del pedido
                  </span>
                  <input
                    type="text"
                    name="order"
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
                  />
                </label>
                <label className="block">
                  <span className=" block text-sm font-medium text-slate-700">
                    Cantidad
                  </span>
                  <input
                    value={billAmount}
                    onChange={(e) => setBillAmount(e.target.value)}
                    type="text"
                    name="amount"
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
                  />
                </label>
                <label className="block">
                  <span className=" block text-sm font-medium text-slate-700">
                    Divisa
                  </span>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-64 focus:border-blue-500 block p-2.5 "
                  >
                    <option value={"USD"}>Dolar</option>
                    <option value="EUR">EURO</option>
                    <option value="MXN">MXN</option>
                  </select>
                </label>
                <label className="block">
                  <span className=" block text-sm font-medium text-slate-700">
                    Valor en pesos
                  </span>
                  <input
                    type="text"
                    name="order"
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
                  />
                </label>
                <label className="block">
                  <span className=" block text-sm font-medium text-slate-700">
                    Numero de pagos
                  </span>
                  <input
                    type="text"
                    name="order"
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
                  />
                </label>
                <label className="block">
                  <span className=" block text-sm font-medium text-slate-700">
                    Saldo
                  </span>
                  <input
                    type="text"
                    name="order"
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
                  />
                </label>
              </div>
              {/*
        Segundo container
         */}
              <div className="min-[320px]:flex-col min-[320px]:w-11/12 md:flex-row container flex flex-wrap items-center justify-center mx-auto bg-white p-5 rounded-xl mt-5 gap-8">
                <label className="block">
                  <span className=" block text-sm font-medium text-slate-700">
                    Oferta
                  </span>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64"></select>
                </label>
                <label className="block">
                  <span className=" block text-sm font-medium text-slate-700">
                    Concepto
                  </span>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64"></select>
                </label>
                <label className="block">
                  <span className=" block text-sm font-medium text-slate-700">
                    Clase
                  </span>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64">
                    <option value="PR">Produccion</option>
                    <option value="CM">Comision</option>
                  </select>
                </label>
                <label className="block">
                  <span className=" block text-sm font-medium text-slate-700">
                    Tipo
                  </span>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64">
                    <option value="UN"> Unico </option>
                    <option value="RE">Recurrente</option>
                  </select>
                </label>

                <label className="block">
                  <span className=" block text-sm font-medium text-slate-700">
                    Status
                  </span>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64 ">
                    <option value="IK">Selecciona una opcion</option>
                    <option value="EU">Activa</option>
                  </select>
                </label>
              </div>
              {/*
          Tercer container
           */}
              <div className="min-[320px]:flex-col min-[320px]:w-11/12 md:flex-row container flex flex-wrap items-center justify-center mx-auto bg-white p-5 rounded-xl mt-5 gap-5 h-1/7">
                {/*
          Drag and drop zone
           */}
                <div className="border-dashed border-2 border-indigo-200 hover:border-indigo-500 flex flex-col justify-center items-center  w-1/2 p-10">
                  <span className=" block text-sm text-center text-slate-400 font-semibold mb-2">
                    Arrastre y suelte el archivo aqui
                  </span>

                  <button
                    type="file"
                    className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    acept="image/*"
                    onChange={(e) => {}}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Subir archivos
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="ml-2 -mr-1 w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/*
        Container de resumen
        */}
            <div className=" my-2 mx-2">
              <div className=" text-center">
                <h1 className="mt-4 min-[320px]:text-2xl font-semibold text-blue-500 md:text-4xl">
                  Resumen
                </h1>
              </div>
              <div className="min-[320px]:flex-col min-[320px]:w-96 md:flex-col container flex flex-col items-center text-center justify-center mx-auto bg-white p-12 rounded-xl mt-5 gap-20 h-[77.5%]">
                <label className="block">
                <span className="font-semibold text-3xl">
                    {billAmount}
                  </span>
                  <span className=" block text-sm font-medium text-slate-700">
                    Monto del pedido
                  </span>

                </label>

                <label className="block">
                  <span className=" block text-sm font-medium text-slate-700">
                    Divisa
                  </span>
                  <span className="font-semibold text-3xl"></span>
                </label>

                <label className="block">
                  <span className=" block text-sm font-medium text-slate-700">
                    Valor en pesos
                  </span>
                  <span className="font-semibold text-3xl"></span>
                </label>
                <label className="block">
                  <span className=" block text-sm font-medium text-slate-700">
                    Estado
                  </span>
                  <span className="font-semibold text-3xl"></span>
                </label>
              </div>
              <div className="flex justify-center items-center  w-full h-1/6">
                <button
                  type="submit"
                  className="text-white bg-blue-500 justify-center hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-bold px-5 py-2.5 text-center inline-flex items-center w-[90%]"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default Form_Order;
