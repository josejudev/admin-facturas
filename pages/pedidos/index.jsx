import Layout from "../../components/Layout";
import Link from "next/link";

const pedidos = () => {
  return (
    <>
      <Layout title={"Pedidos"} description="This is the pedidos page">
        <div className="container flex flex-wrap items-center gap-4 mx-auto">
          <h1 className="text-5xl my-5 font-semibold text-gray-800">
            Tabla de pedidos
          </h1>
          <Link href="/pedidos/nuevo">
            <button
              type="button"
              className="text-white bg-sky-400 hover:bg-sky-500 border  focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 "
            >
              Agregar nuevo
            </button>
          </Link>
          <button
            type="button"
            class="text-white bg-red-500 hover:bg-red-600 border  focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 "
          >
            Eliminar seleccionados
          </button>
        </div>
        <div className="container mx-auto bg-white h-full p-5 rounded-lg">
          <div className="container grid grid-cols-2 flex-wrap items-center mx-auto">
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64">
              <option value="UN"> Todos </option>
              <option value="RE">Pendientes</option>
            </select>
            <div className="col-span-1 grid grid-cols-3 gap-2">
              <input
                type="text"
                name="search"
                placeholder="Buscar"
                className=" placeholder-gray-500 border-solid border-2 border-gray-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 bg-white rounded-lg h-11 p-1"
              />
              <input
                type="date"
                className="text-center border-solid border-2 border-gray-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 p-2.5 bg-white rounded-lg h-11"
              />

              <button className="border-solid border-2 border-gray-300 bg-white p-2.5 bg flex justify-center items-center text-green-400 rounded-lg h-11">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <table class="table p-4 mt-10 bg-white rounded-lg shadow table-auto w-full">
            <thead>
              <tr>
                <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </th>
                <th class="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                  Fecha de pedido
                </th>
                <th class="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                  Pedido
                </th>
                <th class="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                  Cantidad
                </th>
                <th class="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                  Tipo
                </th>
                <th class="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                  Clase
                </th>
                <th class="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                  N° de pagos
                </th>
                <th class="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                  Factura
                </th>
                <th class="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                  Fecha de Factura
                </th>
                <th class="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                  Status
                </th>
                <th class="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr class="text-gray-700">
                <td class="border-b-2 p-4 dark:border-dark-5">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </td>
                <td class="border-b-2 p-4 dark:border-dark-5">5/5/2021</td>
                <td class="border-b-2 p-4">88991</td>
                <td class="border-b-2 p-4">$3000.00</td>
                <td class="border-b-2 p-4">Recurrente</td>
                <td class="border-b-2 p-4">Produccion</td>
                <td class="border-b-2 p-4">4</td>
                <td class="border-b-2 p-4">11-ATYP-0001</td>
                <td class="border-b-2 p-4">Fecha de factura</td>
                <td class="border-b-2 p-4 ">Status</td>
                <td class="border-b-2 p-4 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};

export default pedidos;
