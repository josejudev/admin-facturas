import Head from "next/head";
import Header from "./Header";
import Modal from "react-modal";
import useAdmin from "../hooks/useAdmin";
import ModalOffer from "./Modals/EditOffer";
import { useRouter } from "next/router";
import AddOffer from "./Modals/AddOffer";
import AddClient from "./Modals/AddClient";
import ModalDelete from "./Modals/ModalDelete";
import EditClient from "./Modals/EditClient";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    //Create a transition
    transition: "all 0.2s ease-in-out",
  },

};

Modal.setAppElement("#__next");

function Layout({ children, title = "", description = "" }) {
  const router = useRouter();

  const { modalEditOffer, modalAddOffer, modalAddClient, modalDelete, modalEditClient } = useAdmin();

  return (
    <>
      <Head>
        <title>{`admin - ${title}`}</title>
        <meta name="description" content={description} />
      </Head>
      <ToastContainer
        position="bottom-center"
        autoClose={1800} 
      />
      <Header />
      {children}
      {modalAddOffer && (
        <Modal isOpen={modalAddOffer} style={customStyles}   >
          <AddOffer />
        </Modal>
      )}
      {modalEditOffer && (
        <Modal isOpen={modalEditOffer} style={customStyles}>
          <ModalOffer />
        </Modal>
      )}

      {modalAddClient && (
        <Modal isOpen={modalAddClient} style={customStyles}>
          <AddClient />
        </Modal>
      )}

      {modalEditClient && (
        <Modal isOpen={modalEditClient} style={customStyles}>
          <EditClient />
        </Modal>
      )}

      {modalDelete && (
        <Modal isOpen={modalDelete} style={customStyles}>
          <ModalDelete />
        </Modal>
      )}


    </>
  );
}

export default Layout;
