import Layout from "../../components/Layout";
import Form_Order from "../../components/Form_Order";

const nuevo_pedido = () => {
  return (
    <>
    <Layout title={"Nuevo pedido"} description="This is the nuevo pedido page">
        <div className="container flex flex-wrap items-center mx-auto">
            <h1 className="text-5xl my-5 font-semibold text-gray-800">
                Nuevo pedido
            </h1>
        </div>
            <Form_Order />

    </Layout>
    </>
  )
}

export default nuevo_pedido