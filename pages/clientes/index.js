import Layout from "../../components/Layout";
import Header_Table from "../../components/HeaderTable";
import ClientsTable from "../../components/Clients/ClientsTable";

import axios from "axios";
const index = ({ clients }) => {
  return (
    <>
      <Layout title={"Clientes"} description="This is the clients page">
        <Header_Table title="Clientes" />
        <div className="px-2 sm:px-4 py-2.5">
          <div className=" mx-auto bg-white h-full p-5 rounded-lg">
            <ClientsTable clients={clients} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { data: clients } = await axios.get(
    "http://localhost:3000/api/clients"
  );
  return {
    props: {
      clients,
    },
  };
};

export default index;
