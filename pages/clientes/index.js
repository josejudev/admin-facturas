import Layout from "../../components/Layout";
import Header_Table from "../../components/HeaderTable";
import ClientsTable from "../../components/Clients/ClientsTable";
import axios from "axios";
const index = ({ clients }) => {
  return (
    <>
      <Layout title={"Clientes"} description="This is the pedidos page">
        <Header_Table title="Clientes" onClick={true} />
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

              <button className="border-solid border-2 border-gray-300 bg-white p-2.5 bg flex justify-center items-center text-green-400 rounded-lg h-11 w-full">
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
          <ClientsTable clients={clients} />
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
