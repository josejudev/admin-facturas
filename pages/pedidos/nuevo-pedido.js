import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import useAdmin from "../../hooks/useAdmin";

const Form_Order = () => {
  const {offers} = useAdmin();

  const pendingOffers = offers.filter((offer) => offer.status === "Aceptado");

  const [order, setOrder] = useState({
    date: "",
    name: "",
    fileName: "",
    concept: "",
    type: "",
    class_type: "",
    entity: "",
    status: "",
    offer_id: "",
    //Money data
    amount: "",
    final_amount: "",
    currency: "",
    order_balance: "",
    milestone: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const typeCurrency = [
    { id: 1, name: "USD" },
    { id: 2, name: "EUR" },
    { id: 3, name: "MXN" },
  ];

  const typeClass = [
    { id: 1, name: "ATYCOM" },
    { id: 2, name: "PROD AT" },
  ]

  const typeEntity = [
    { id: 1, name: "Unico" },
    { id: 2, name: "Recurrente" },
  ]

  const typeStatus = [
    { id: 1, name: "Activo" },
    { id: 2, name: "Cerrado" },
  ]

  const handleCurrency = ({ target: { name, value } }) => {
    setOrder({
      ...order,
      [name]: value,
    });
    
  };

  return (
    <>
      <Layout title={"Nuevo Pedido"}>
        <form>
          {/*
        Primer container
         */}
          <div className="h-full w-ful pt-4 px-4">
            <h1 className=" mb-2 text-left text-4xl font-bold">
              Agregar nuevo pedido
            </h1>
            <div className="mx-auto max-w-full justify-center px-6 md:flex md:space-x-6 xl:px-0">
              <div className="rounded-lg md:w-2/3">
                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="md:flex-row  flex flex-wrap items-center justify-center mx-auto bg-white rounded-xl mt-5 gap-8">
                      <label className="block">
                        <span className="block text-sm font-medium text-slate-700">
                          Fecha del pedido
                        </span>
                        <input
                          type="date"
                          name="date"
                          onChange={handleChange}
                          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
                        />
                      </label>
                      <label className="block">
                        <span className=" block text-sm font-medium text-slate-700">
                          Nombre del pedido
                        </span>
                        <input
                          type="text"
                          name="name"
                          onChange={handleChange}
                          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
                        />
                      </label>
                      <label className="block">
                        <span className=" block text-sm font-medium text-slate-700">
                          Cantidad
                        </span>
                        <input
                          onChange={handleChange}
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
                          name="currency"
                          defaultValue={1}
                          onChange={handleCurrency}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-64 focus:border-blue-500 block p-2.5 "
                        >
                          {typeCurrency.map((item) => (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="block">
                        <span className=" block text-sm font-medium text-slate-700">
                          Valor en pesos
                        </span>
                        <input
                          onChange={handleChange}
                          type="text"
                          name="final_amount"
                          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
                        />
                      </label>
                      <label className="block">
                        <span className=" block text-sm font-medium text-slate-700">
                          Numero de pagos
                        </span>
                        <input
                          type="text"
                          name="milestone"
                          onChange={handleChange}
                          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
                        />
                      </label>
                      <label className="block">
                        <span className=" block text-sm font-medium text-slate-700">
                          Saldo
                        </span>
                        <input
                          type="text"
                          name="order_balance"
                          onChange={handleChange}
                          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
                        />
                      </label>
                    </div>
                  </div>
                </div>
{
  /**
   * Segundo contenedor
   */
}
                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className=" md:flex-row flex flex-wrap items-center justify-center mx-auto bg-white rounded-xl mt-5 gap-8">
                      <label className="block">
                        <span className=" block text-sm font-medium text-slate-700">
                          Oferta
                        </span>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64">
                          {
                            pendingOffers.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.project_name}
                              </option>
                            ))
                          }
                        </select>
                      </label>
                      <label className="block">
                        <span className=" block text-sm font-medium text-slate-700">
                          Concepto
                        </span>
                        <input
                          type="text"
                          name="concept"
                          onChange={handleChange}
                          className=" px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
                        />

                      </label>
                      <label className="block">
                        <span className=" block text-sm font-medium text-slate-700">
                          Clase
                        </span>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64">
                          {
                            typeClass.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))
                          }
                        </select>
                      </label>
                      <label className="block">
                        <span className=" block text-sm font-medium text-slate-700">
                          Tipo
                        </span>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64">
                        {
                          typeEntity.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))
                        }
                        </select>
                      </label>

                      <label className="block">
                        <span className=" block text-sm font-medium text-slate-700">
                          Status
                        </span>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64 ">
                          {
                            typeStatus.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))
                          }
                        </select>
                      </label>
                    </div>
                  </div>
                </div>

                {
                  /*
                  Drag and drop
                  */
                }

                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-center">
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
              <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Cantidad</p>
                  <p className="text-gray-700">
                    {order.currency === "MXN" && order.amount > 0
                      ? "$" + order.amount + " MXN"
                      : order.currency === "USD" && order.amount > 0
                      ? "$" + order.amount + " USD"
                      : order.currency === "EUR" && order.amount > 0
                      ? "€" + order.amount + " EUR"
                      : order.amount > 0
                      ? "$" + order.amount
                      : "$0.00"}
                  </p>
                </div>
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Valor en pesos</p>
                  <p className="text-gray-700">
                    {order.final_amount > 0
                      ? "$" + order.final_amount + " MXN"
                      : "$0.00"}
                  </p>
                </div>
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Saldo</p>
                  <p className="text-gray-700">
                    {
                      order.order_balance > 0 ? "$" + order.order_balance + " MXN" : "$0.00"
                    }
                  </p>
                </div>
                
                <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold">$134.98 USD</p>
                    <p className="text-sm text-gray-700">including VAT</p>
                  </div>
                </div>
                <button className="mt-6 w-full rounded-md bg-blue-500 py-3.5 font-bold text-md text-blue-50 hover:bg-blue-600">
                  Guardar pedido
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
