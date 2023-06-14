import {Modal,AddOffer,AddClient,EditOffer,ModalDelete,EditClient,ToastContainer,useSelector,selectModalClient,selectModalClientEdit,selectModalOffer,selectModalDelete,selectModalOfferEdit,selectModalOrderEdit,EditMilestone,fetchUser,useDispatch,useEffect} from '../exports/commonExports';
import Head from "next/head";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import EditOfertita from './Modals/EditMilestone';


const customStyles = {
  content: {
    top: "52%",
    left: "50%",
    maxWidth: "100%",
    right: "auto",
    bottom: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "auto",
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



function Layout({ children, title = "", description = "",  }) {
  const handleDataFromChild = (data) => {
    console.log('Datos recibidos en layout:', data);
    // Haz algo con los datos recibidos del componente hijo
  };


  
  
  const user = useSelector((state) => state.users.data);
  const modalClient = useSelector(selectModalClient);
  const modalOffer = useSelector(selectModalOffer);
  const modalDelete = useSelector(selectModalDelete);
  const modalClientEdit = useSelector(selectModalClientEdit);
  const modalOfferEdit = useSelector(selectModalOfferEdit);
  const modalOrderEdit = useSelector(selectModalOrderEdit);


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
      {modalOfferEdit.modal && (
        <Modal isOpen={true} style={customStyles}>
          <EditOffer  offerId={modalOfferEdit.id} />
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

      {modalDelete.modal && (
        <Modal isOpen={true} style={customStyles}>
          <ModalDelete idProp={modalDelete.id} />
        </Modal>
      )}
      {modalOrderEdit.modal && (
        <Modal isOpen={true} style={customStyles}>
          <EditMilestone orderId={modalOrderEdit.id} sendDataToParent={handleDataFromChild} handleDataFromChild={handleDataFromChild} />
        </Modal>
      )}


    </>
  );
}

export default Layout;
