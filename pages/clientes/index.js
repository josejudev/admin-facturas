import Layout from "../../components/Layout";
import Header_Table from "../../components/HeaderTable";
import ClientsT from "../../components/Clients/ClientsT";

const index = () => {
  return (
    <>
      <Layout title={"Clientes"} description="This is the clients page">
        <Header_Table title="Clientes" />
        <div className="px-2 sm:px-4 py-2.5">
          <div className=" mx-auto bg-white h-full p-5 rounded-lg">
            <ClientsT />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default index;
