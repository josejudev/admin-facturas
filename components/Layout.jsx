import Head from "next/head"
import Header from "./Header"
import Modal from "react-modal"
import useAdmin from "../hooks/useAdmin"
import ModalOffer from "./ModalOffer"



const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "none",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    //set blur
    backdropFilter: "blur(5px)",
    ShadowRoot: "0 0 5px 0 rgba(0, 0, 0, 0.5)",
  }
}

Modal.setAppElement("#__next");

function Layout({ children, title='', description = '' }) {

  const { modal} = useAdmin();
  
  return (
    <>
      <Head>
        <title>{`admin - ${title}`}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
        {children}
        {modal && (
          <Modal
            isOpen={modal}
            style={customStyles}
            
          >
            <ModalOffer />
          </Modal>
        )}
        
    </>
  )
}

export default Layout