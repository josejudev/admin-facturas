import Layout from "../../components/Layout";
import Form_Order from "../../components/Form_Order";

const nuevo_pedido = () => {
  return (
    <>
    <Layout title={"Nuevo pedido"} description="This is the nuevo pedido page">
        <div className="container flex flex-wrap items-center mx-auto">
            <h1 className=" my-5 min-[320px]:text-3xl font-semibold text-gray-800 md:text-5xl">
                Nuevo pedido
            </h1>
        </div>
            <Form_Order />

    </Layout>
    </>
  )
}

export default nuevo_pedido