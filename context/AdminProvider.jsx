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
    //Save all orders in state
    const [orders, setOrders] = useState([]);
    //Save the order selected in state
    const [order, setOrder] = useState({});

    //Get the user logged
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
    const [modalDelete, setModalDelete] = useState(false);

    const getClients = async () => {
        const { data } = await axios.get('/api/clients');
        setClients(data);
    }
    const getOffers = async () => {
        const { data } = await axios.get('/api/offers');
        setOffers(data);
    }
    const getOrders = async () => {
        const { data } = await axios.get('/api/orders');
        setOrders(data);
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
        getOrders();
    }, []);

    const handleSetOffer = (offer) => {
        setOffer(offer);
    }
    const handleSetClient = (client) => {
        setClient(client);
    }
    const handleSetOrder = (order) => {
        setOrder(order);
    }

    const handleModalEditOffer = () => {
        setModalEditOffer(!modalEditOffer);
    }

    const handleModalOffer = () => {
        setModalOffer(!modalAddOffer);
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

                orders,
                order,

                handleSetOffer,
                handleSetClient,
                handleSetOrder,

                modalEditOffer,
                handleModalEditOffer,

                modalAddOffer,
                handleModalOffer,


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