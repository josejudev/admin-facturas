const Form_Order = () => {
  return (
    <>
      <form>
        {/*
        Primer container
         */}
        <div className="container flex flex-wrap items-center justify-between mx-auto bg-white  p-12 rounded-xl">
          <label class="block">
            <span class=" block text-sm font-medium text-slate-700">
              Fecha del pedido
            </span>
            <input
              type="date"
              name="date"
              class="mt-1 px-24 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>
          <label class="block">
            <span class=" block text-sm font-medium text-slate-700">
              Pedido
            </span>
            <input
              type="text"
              name="order"
              class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>
          <label class="block">
            <span class=" block text-sm font-medium text-slate-700">
              Cantidad
            </span>
            <input
              type="text"
              name="amount"
              class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>
          <label class="block">
            <span class=" block text-sm font-medium text-slate-700">Tipo</span>
            <select
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
            >
              <option selected>Escoge un tipo</option>
              <option value="RE">Recurrente</option>
            </select>
          </label>
          <label class="block">
            <span class=" block text-sm font-medium text-slate-700">Clase</span>
            <select
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
            >
              <option selected>Escoge una clase</option>
              <option value="CM">Comision</option>
            </select>
          </label>
        </div>
        {/*
        Segundo container
         */}
        <div className="container flex flex-wrap items-center justify-between mx-auto bg-white  p-12 rounded-xl mt-5">
          <label class="block">
            <span class=" block text-sm font-medium text-slate-700">
              Fecha del factura
            </span>
            <input
              type="date"
              name="date"
              class="mt-1 px-24 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>
          <label class="block">
            <span class=" block text-sm font-medium text-slate-700">
              Numero de pagos
            </span>
            <input
              type="text"
              name="order"
              class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>
          <label class="block">
            <span class=" block text-sm font-medium text-slate-700">
              Factura
            </span>
            <input
              type="text"
              name="invoice"
              class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>
          <label class="block">
            <span class=" block text-sm font-medium text-slate-700">
              Divisa
            </span>
            <select
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
            >
              <option selected>Selecciona una opcion</option>
              <option value="RE">EURO</option>
            </select>
          </label>
          <label class="block">
            <span class=" block text-sm font-medium text-slate-700">
              Tipo de cambio
            </span>
            <input
              type="text"
              name="invoice"
              class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>
        </div>
        {/*
          Tercer container
           */}
        <div className="container flex flex-wrap items-center justify-start gap-10 mx-auto bg-white  p-12 rounded-xl mt-5">
          <label class="block">
            <span class=" block text-sm font-medium text-slate-700">
              Numero de pagos
            </span>
            <input
              type="text"
              name="nPagos"
              class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>
          <label class="block">
            <span class=" block text-sm font-medium text-slate-700">
              Status
            </span>
            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ">
              <option selected>Selecciona una opcion</option>
              <option value="EU">Activa</option>
            </select>
          </label>
          
        </div>
        <div className="container flex flex-wrap items-center justify-end gap-10 mx-auto mt-5">
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-16 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    Agregar
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

</button>
        </div>

        
      </form>
    </>
  );
};

export default Form_Order;
