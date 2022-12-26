import Head from "next/head"
import Header from "./Header"

function Layout({ children, title='', description = '' }) {
  return (
    <>
      <Head>
        <title>{`admin - ${title}`}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
        {children}
        
    </>
  )
}

export default Layout