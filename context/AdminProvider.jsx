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

    const [user, setUser] = useState({});
    /*
    * Modal state
    * Modal: Edit offer
    * ModalAddOffer: Add offer
    * ModalAddClient: Add client
    * ModalDelete: Delete offer
    * ModalEditClient: Edit client
     */
    const [modalEditOffer, setModalEditOffer] = useState(false);
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

    const getUser = async () => {
        try {
            const { data } = await axios.get('/api/auth/profile');
            setUser(data);
        }
        catch (error) {
            console.log("No user logged in");
        }

    }

    useEffect(() => {
        getClients();
        getOffers();
        getUser();
    }, []);

    const handleSetOffer = (offer) => {
        setOffer(offer);
    }
    const handleSetClient = (client) => {
        setClient(client);
    }

    const handleModalEditOffer = () => {
        setModalEditOffer(!modalEditOffer);
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
                offers,

                handleSetOffer,
                handleSetClient,

                modalEditOffer,
                handleModalEditOffer,

                modalAddOffer,
                handleModalOffer,

                modalAddClient,
                handleModalClient,

                modalDelete,
                handleModalDelete,

                modalEditClient,
                handleModalEditClient,

                user
            }}>
            {children}
        </AdminContext.Provider>
    )
}
export {
    AdminProvider
}

export default AdminContext;