import Layout from "../../components/Layout";
import axios from "axios";
import Header_Table from "../../components/HeaderTable";
import OrdersTable from "../../components/Orders/OrdersTable";

const pedidos = ({orders}) => {
  return (
    <>
      <Layout title={"Pedidos"} description="This is the orders page">
        <Header_Table title="Pedidos" href="pedidos/nuevo-pedido" />
        <div className="px-2 sm:px-4 py-2.5">
          <div className=" mx-auto bg-white h-full p-5 rounded-lg">
            <OrdersTable orders={orders}/>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { data: orders } = await axios.get("http://localhost:3000/api/orders/");
  return {
    props: {
      orders,
    },
  };
}

export default pedidos;
