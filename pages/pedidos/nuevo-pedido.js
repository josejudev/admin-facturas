import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import useAdmin from "../../hooks/useAdmin";
import { useRouter } from "next/router";

const Form_Order = () => {
  const router = useRouter();
  const { offers } = useAdmin();
  const{ offersEmpty } = useAdmin();
  const pendingOffers = offers.filter((offer) => offer.status === "Pendiente");



  const typeCurrency = [
    { id: 1, name: "USD" },
    { id: 2, name: "EUR" },
    { id: 3, name: "MXN" },
  ];

  const typeClass = [
    { id: 1, name: "ATYCOM" },
    { id: 2, name: "PROD AT" },
  ];

  const typeEntity = [
    { id: 1, name: "UNICO" },
    { id: 2, name: "RECURRENTE" },
  ];

  const typeStatus = [
    { id: 1, name: "ACTIVO" },
    { id: 2, name: "CERRADO" },
  ];

  


  const [order, setOrder] = useState({
    date: "",
    name: "",
    fileName: "",
    concept: "",
    type: typeEntity[0].name,
    class_type: typeClass[0].name,
    entity: "",
    offer_id: 1, 
    //Money data
    amount: "",
    final_amount: "",
    currency: typeCurrency[0].name,
    order_balance: "",
    milestone: "",
    status : typeStatus[0].name,
    //Status data
  });

  const handleChange = ({ target: { name, value } }) => {
    setOrder({
      ...order,
      [name]: value,
    });
  };



  const handleCurrency = ({ target: { name, value } }) => {
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const handleFile = ({ target: { name, files } }) => {
    setOrder({
      ...order,
      [name]: files[0],
    });
  }

  const handleStatus = ({ target: { name, value } }) => {
    setOrder({
      ...order,
      [name]: value,
    });
  }




  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const body = new FormData();
      body.append("date", order.date);
      body.append("name", order.name);
      body.append("fileName", order.fileName);
      body.append("concept", order.concept);
      body.append("type", order.type);
      body.append("class_type", order.class_type);
      body.append("entity", order.entity);
      body.append("offer_id", order.offer_id);
      body.append("amount", order.amount);
      body.append("final_amount", order.final_amount);
      body.append("currency", order.currency);
      body.append("order_balance", order.order_balance);
      body.append("milestone", order.milestone);
      body.append("status", order.status);
      const res = await axios.post("/api/orders", body);
      router.push("/pedidos");
    } catch (error) {
      console.log("Hubo un error")
    }

  }




  return (
    <>
      <Layout title={"Nuevo Pedido"}>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                {/**
                 * Segundo contenedor
                 */}
                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className=" md:flex-row flex flex-wrap items-center justify-center mx-auto bg-white rounded-xl mt-5 gap-8">
                      <label className="block">
                        <span className=" block text-sm font-medium text-slate-700">
                          Oferta
                        </span>
                        <select
                        name="offer_id"
                        onChange={handleChange}
                        defaultValue={1}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64">

                          {pendingOffers.map((offer) => (
                            <option key={offer.id} value={offer.id}>
                              {offer.project_name}
                            </option>
                          ))}
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
                        <select
                        name="class_type" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64">
                          {typeClass.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="block">
                        <span className=" block text-sm font-medium text-slate-700">
                          Tipo
                        </span>
                        <select
                        name="type"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64">
                          {typeEntity.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="block">
                        <span className=" block text-sm font-medium text-slate-700">
                          Status
                        </span>
                        <select
                        name="status"
                        onChange={handleStatus}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64 ">
                          {typeStatus.map((item) => (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </div>
                </div>

                {/*
                  Drag and drop
                  */}

                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-center">
                  <div className="w-1/2">
                    <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                      <span className="flex items-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <span className="font-medium text-gray-600">
                          Arrastre y suelte su archivo aquí o
                          <span className="text-blue-600 underline">
                            {" "}
                            seleccione
                          </span>
                        </span>
                      </span>
                      <input type="file" name="fileName" className="hidden" onChange={ handleFile}/>
                    </label>
                  </div>
                </div>
              </div>
              {/*
                  End of drag and drop
                  */}

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
                    {order.order_balance > 0
                      ? "$" + order.order_balance + " MXN"
                      : "$0.00"}
                  </p>
                </div>

                <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold">{
                      order.final_amount > 0 ? "$" + order.final_amount + " MXN" : "$0.00"
                    }</p>
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
