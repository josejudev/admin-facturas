import { useState, useEffect } from "react";
import { moneyFormatEUR, moneyFormatUSD, moneyFormatMXN} from "../helpers/moneyFormat"

const Form_Order = () => {
  let [billAmount, setBillAmount] = useState('');
  let [exchange, setExchange] = useState('');
  let [balance, setBalance] = useState('');
  let [currency, setCurrency] = useState('');
  let result = billAmount * exchange;
  if(result == 0){
    result = billAmount
  }
  if (billAmount == 0) {
    result = 0;
  }



  return (
    <>
      <form>
        {/*
        Primer container
         */}
         
        <div className="min-[320px]:flex-col min-[320px]:w-11/12 md:flex-row container flex flex-wrap items-center justify-center mx-auto bg-white p-12 rounded-xl mt-5 gap-10">
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
              Pedido
            </span>
            <input
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
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
              type="text"
              name="amount"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
            />
          </label>
          <label className="block">
            <span className=" block text-sm font-medium text-slate-700">
              Tipo
            </span>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64"
            >
              <option value="UN"> Unico </option>
              <option value="RE">Recurrente</option>
            </select>
          </label>
          <label className="block">
            <span className=" block text-sm font-medium text-slate-700">
              Clase
            </span>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64"
            >
              <option value="PR">Produccion</option>
              <option value="CM">Comision</option>
            </select>
          </label>
        </div>
        {/*
        Segundo container
         */}
        <div className="min-[320px]:flex-col min-[320px]:w-11/12 md:flex-row container flex flex-wrap items-center justify-center mx-auto bg-white p-12 rounded-xl mt-5 gap-10">
          <label className="block">
            <span className=" block text-sm font-medium text-slate-700">
              Fecha de la factura
            </span>
            <input
              type="date"
              name="date"
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
              Factura
            </span>
            <input
              type="text"
              name="invoice"
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
        <div className="min-[320px]:flex-col min-[320px]:w-11/12 md:flex-row container flex flex-wrap items-center justify-center mx-auto bg-white p-12 rounded-xl mt-5 gap-10">


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
              onChange={(e) => {
                console.log(e.target.files);
              }}
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
        {/*
        Container de resumen
        */}
        <div className="container flex flex-wrap items-center mx-auto">
          <h1 className="mt-4 min-[320px]:text-2xl font-semibold text-gray-800 md:text-3xl">
            Resumen
          </h1>
        </div>
        <div className="min-[320px]:flex-col min-[320px]:w-11/12 md:flex-row container flex flex-wrap items-center text-center justify-center mx-auto bg-white p-12 rounded-xl mt-5 gap-20">
          <label className="block">
            <span className=" block text-sm font-medium text-slate-700">
              Monto de factura
            </span>
            <span className="font-semibold text-3xl">
              {  currency === "USD" ? moneyFormatUSD(parseFloat(billAmount)) : billAmount === NaN ? 1 : currency === "" ? moneyFormatUSD(parseFloat(billAmount)) : currency === ""? "0": currency === "EUR" ? moneyFormatEUR(parseFloat(billAmount)) : currency === "MXN" ? moneyFormatMXN(parseFloat(billAmount)) : 0 }
            </span>
            </label>

            <label className="block">
            <span className=" block text-sm font-medium text-slate-700">
              Divisa
            </span>
            <span className="font-semibold text-3xl">
              {
                currency === "" ? "USD" : currency === "USD" ? "USD" :currency === "EUR" ? "EUR" : currency === "MXN" ? "MXN" : ""
              } 
            </span>
            </label>




            <label className="block">
            <span className=" block text-sm font-medium text-slate-700">
              Valor en pesos
            </span>
            <span className="font-semibold text-3xl">
              {moneyFormatMXN(parseFloat(result)) }

            </span>
            </label>
        </div>

        <div className="container flex flex-wrap items-center justify-end gap-10 mx-auto mt-5">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-16 py-2.5 mb-3 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Agregar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </form>
    </>
  );
};

export default Form_Order;
