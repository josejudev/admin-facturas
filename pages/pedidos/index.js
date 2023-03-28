import Layout from "../../components/Layout";
import Header_Table from "../../components/HeaderTable";
import OrdersT from "../../components/Orders/OrdersT";

const pedidos = () => {
  return (
    <>
      <Layout title={"Pedidos"} description="This is the orders page">
        <Header_Table title="Pedidos" href="pedidos/nuevo-pedido" />
        <div className="px-2 sm:px-4 py-2.5">
          <div className="mx-auto bg-white h-full p-5 rounded-lg">
            <OrdersT />
          </div>
        </div>
      </Layout>
    </>
  );
};





export default pedidos;
