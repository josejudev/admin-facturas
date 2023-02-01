import Head from "next/head";
import Header from "./Header";
import Modal from "react-modal";
import useAdmin from "../hooks/useAdmin";
import ModalOffer from "./Modals/EditOffer";
import { useRouter } from "next/router";
import Modalito from "./Modals/OfferModal";
import ClientModal from "./Modals/ClientModal";

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
  },
};

Modal.setAppElement("#__next");

function Layout({ children, title = "", description = "" }) {
  const router = useRouter();

  const { modal, modalAddOffer, modalAddClient } = useAdmin();

  return (
    <>
      <Head>
        <title>{`admin - ${title}`}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      {children}
      {modalAddOffer && (
        <Modal isOpen={modalAddOffer} style={customStyles}>
          <Modalito />
        </Modal>
      )}
      {modal && (
        <Modal isOpen={modal} style={customStyles}>
          <ModalOffer />
        </Modal>
      )}

      {modalAddClient && (
        <Modal isOpen={modalAddClient} style={customStyles}>
          <ClientModal />
        </Modal>
      )}
    </>
  );
}

export default Layout;
