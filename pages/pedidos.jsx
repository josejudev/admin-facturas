import Layout from "../components/Layout";
import Table_Pedidos from "../components/Table_Pedidos";

const pedidos = () => {
  return (
    <>
      <Layout title={"Pedidos"} description="This is the pedidos page">
        <div className="container flex flex-wrap items-center gap-4 mx-auto">
          <h1 className="text-5xl my-5 mx-20 font-semibold text-gray-800">
            Tabla de pedidos
          </h1>
          <button
            type="button"
            class="text-white bg-sky-400 hover:bg-sky-500 border  focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 "
          >
            Agregar nuevo
          </button>
          <button
            type="button"
            class="text-white bg-red-500 hover:bg-red-600 border  focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 "
          >
            Eliminar seleccionados
          </button>

          <input
            type="text"
            className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <Table_Pedidos />
      </Layout>
    </>
  );
};

export default pedidos;
