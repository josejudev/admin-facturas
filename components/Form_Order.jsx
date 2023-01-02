const Form_Order = () => {
  return (
    <>
      <form>
        {/*
        Primer container
         */}
        <div className="sm:justify-around sm:py-12 sm:bg-indigo-300 md:bg-indigo-200 container flex flex-wrap items-center justify-between mx-auto bg-white md:p-12 rounded-xl">
          <label className="block">
            <span className=" block text-sm font-medium text-slate-700">
              Fecha del pedido
            </span>
            <input
              type="date"
              name="date"
              className="mt-1 px-24 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>
          <label className="block">
            <span className=" block text-sm font-medium text-slate-700">
              Pedido
            </span>
            <input
              type="text"
              name="order"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>
          <label className="block">
            <span className=" block text-sm font-medium text-slate-700">
              Cantidad
            </span>
            <input
              type="text"
              name="amount"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>
          <label className="block">
            <span className=" block text-sm font-medium text-slate-700">
              Tipo
            </span>
            <select
              defaultValue={"DEFAULT"}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
            >
              <option selected defaultValue={"DEFAULT"}>
                Escoge un tipo
              </option>
              <option value="RE">Recurrente</option>
            </select>
          </label>
          <label className="block">
            <span className=" block text-sm font-medium text-slate-700">
              Clase
            </span>
            <select
              defaultValue={"DEFAULT"}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
            >
              <option selected value="CI">
                Escoge una clase
              </option>
              <option value="CM">Comision</option>
            </select>
          </label>
        </div>
        {/*
        Segundo container
         */}
        <div className="container flex flex-wrap items-center justify-between mx-auto bg-white  p-12 rounded-xl mt-5">
          <label className="block">
            <span className=" block text-sm font-medium text-slate-700">
              Fecha del factura
            </span>
            <input
              type="date"
              name="date"
              className="mt-1 px-24 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>
          <label className="block">
            <span className=" block text-sm font-medium text-slate-700">
              Numero de pagos
            </span>
            <input
              type="text"
              name="order"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>
          <label className="block">
            <span className=" block text-sm font-medium text-slate-700">
              Factura
            </span>
            <input
              type="text"
              name="invoice"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>
          <label className="block">
            <span className=" block text-sm font-medium text-slate-700">
              Divisa
            </span>
            <select
              defaultValue={"DEFAULT"}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
            >
              <option selected value="HI">
                Selecciona una opcion
              </option>
              <option value="RE">EURO</option>
            </select>
          </label>
          <label className="block">
            <span className=" block text-sm font-medium text-slate-700">
              Tipo de cambio
            </span>
            <input
              type="text"
              name="invoice"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>
        </div>
        {/*
          Tercer container
           */}
        <div className="container flex flex-wrap items-center justify-start gap-10 mx-auto bg-white  p-12 rounded-xl mt-5">
          <label className="block">
            <span className=" block text-sm font-medium text-slate-700">
              Numero de pagos
            </span>
            <input
              type="text"
              name="nPagos"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>
          <label className="block">
            <span className=" block text-sm font-medium text-slate-700">
              Status
            </span>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ">
              <option value="IK">Selecciona una opcion</option>
              <option value="EU">Activa</option>
            </select>
          </label>
          {/*
          Drag and drop zone
           */}
          <div className="border-dashed border-2 border-indigo-200 hover:border-indigo-500 flex justify-center items-center w-1/2 p-10"
          >
            <button
              type="file"
              className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              acept = "image/*"
              onChange={e => {
                console.log(e.target.files);
              }}
              onClick={e => {
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
        <div className="container flex flex-wrap items-center justify-end gap-10 mx-auto mt-5">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-16 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
