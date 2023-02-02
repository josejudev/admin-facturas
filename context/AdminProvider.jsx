import { useState, useEffect, createContext } from "react";
import axios from "axios";

const AdminContext = createContext();


const AdminProvider = ({ children }) => {
    const [clients, setClients] = useState([]);
    const [offer, setOffer] = useState({});
    const [modal, setModal] = useState(false);
    const [modalAddOffer, setModalOffer] = useState(false);
    const [modalAddClient, setModalClient] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);

    const getClients = async () => {
        const { data } = await axios.get('/api/clients');
        setClients(data);
    }

    useEffect(() => {
        getClients();
    }, []);

    const handleSetOffer = (offer) => {
        setOffer(offer);

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

    const handleModalDelete = () => {
        setModalDelete(!modalDelete);
    }



    
    return (
        <AdminContext.Provider 
        value={{
            clients,
            offer,
            handleSetOffer,
            modal,
            handleChangeModal,
            modalAddOffer,
            handleModalOffer,
            modalAddClient,
            handleModalClient,
            modalDelete,
            handleModalDelete
        }}>
            {children}
        </AdminContext.Provider>
    )
}
export{
    AdminProvider
}

export default AdminContext;