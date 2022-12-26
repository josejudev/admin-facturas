import Layout from "../../components/Layout";
import Table_Pedidos from "../../components/Table_Pedidos";
import Link from "next/link";

const pedidos = () => {
  return (
    <>
      <Layout title={"Pedidos"} description="This is the pedidos page">
        <div className="container flex flex-wrap items-center gap-4 mx-auto">
          <h1 className="text-5xl my-5 font-semibold text-gray-800">
            Tabla de pedidos
          </h1>
          <Link
            href="/pedidos/nuevo"
          >
          <button
            type="button"
            class="text-white bg-sky-400 hover:bg-sky-500 border  focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 "
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
        <Table_Pedidos />
      </Layout>
    </>
  );
};

export default pedidos;
