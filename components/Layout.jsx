import {Modal,useAdmin,AddOffer,AddClient,ModalDelete,ModalOffer,EditClient,ToastContainer,useRouter,useDispatch,useSelector,selectModalClient,handleModalOffer,selectModalClientEdit,modalAddOffer,selectModalOffer} from '../exports/commonExports';
import Head from "next/head";
import Header from "./Header";
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
    backdropFilter: "blur(5px)",
    transition: "all 0.2s ease-in-out",
  },
};

Modal.setAppElement("#__next");

function Layout({ children, title = "", description = "" }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const modalClient = useSelector(selectModalClient);
  const modalOffer = useSelector(selectModalOffer);
  const modalClientEdit = useSelector(selectModalClientEdit);



  const { modalEditOffer, modalAddOffer, modalDelete } = useAdmin();

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
      {modalOffer && (
        <Modal isOpen={modalOffer} style={customStyles}   >
          <AddOffer 
          
          />
        </Modal>
      )}
      {modalEditOffer && (
        <Modal isOpen={modalEditOffer} style={customStyles}>
          <ModalOffer />
        </Modal>
      )}

      {modalClient && (
        <Modal isOpen={modalClient} style={customStyles}>
          <AddClient />
        </Modal>
      )}

      {modalClientEdit.modal && (
        <Modal isOpen={true} style={customStyles}>
          <EditClient clientId={modalClientEdit.id}
          />
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
