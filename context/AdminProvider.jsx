import { useState, useEffect, createContext } from "react";
import axios from "axios";

const AdminContext = createContext();


const AdminProvider = ({ children }) => {
    //Save all clients in state
    const [clients, setClients] = useState([]);
    //Save the client selected in state
    const [client, setClient] = useState({});
    //Save all offers in state
    const [offers, setOffers] = useState([]);
    //Save the offer selected in state
    const [offer, setOffer] = useState({});
    /*
    * Modal state
    * Modal: Edit offer
    * ModalAddOffer: Add offer
    * ModalAddClient: Add client
    * ModalDelete: Delete offer
    * ModalEditClient: Edit client
     */
    const [modal, setModal] = useState(false);
    const [modalEditClient, setModalEditClient] = useState(false);
    const [modalAddOffer, setModalOffer] = useState(false);
    const [modalAddClient, setModalClient] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);

    const getClients = async () => {
        const { data } = await axios.get('/api/clients');
        setClients(data);
    }
    const getOffers = async () => {
        const { data } = await axios.get('/api/offers');
        setOffers(data);
    }

    useEffect(() => {
        getClients();
        getOffers();
    }, []);

    const handleSetOffer = (offer) => {
        setOffer(offer);
    }
    const handleSetClient = (client) => {
        setClient(client);
    }

    const handleChangeModal = () => {
        setModal(!modal);
    }
    
    const handleModalOffer = () => {
        setModalOffer(!modalAddOffer);
    }

    const handleModalClient = () => {
        setModalClient(!modalAddClient);
    }

    const handleModalEditClient = () => {
        setModalEditClient(!modalEditClient);
    }

    const handleModalDelete = () => {
        setModalDelete(!modalDelete);
    }



    
    return (
        <AdminContext.Provider 
        value={{
            clients,
            client,
            offer,
            handleSetOffer,
            modal,
            handleChangeModal,
            modalAddOffer,
            handleModalOffer,
            modalAddClient,
            handleModalClient,
            modalDelete,
            handleModalDelete,
            handleSetClient,
            modalEditClient,
            handleModalEditClient,
        }}>
            {children}
        </AdminContext.Provider>
    )
}
export{
    AdminProvider
}

export default AdminContext;