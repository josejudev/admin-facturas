import Head from "next/head";
import Layout from "../components/Layout";
import Header_Table from "../components/HeaderTable";
import OffersT from "../components/Offers/OffersT";

const Home = () => {
  return (
    <>
      <Head>
        <title>index-ofertas</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout title={"Ofertas"} description="This is the offert page">
          <Header_Table title="Ofertas"/>
          <div className="px-2 sm:px-4 py-2.5">
            <div className=" mx-auto bg-white h-full p-5 rounded-lg">
              <OffersT />
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default Home;
