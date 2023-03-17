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

    const createClient = async (name, rfc, fiscal_address,email,address, contact_phone, contact_email, contact_name) => {
        const { data } = await axios.post('/api/clients', {
            name,
            rfc,
            fiscal_address,
            email,
            address,
            contact_phone,
            contact_email,
            contact_name
        });
        setClients([...clients, data]);
    }

    const removedClient = async (id) => {
        await axios.delete(`/api/clients/${id}`);
        setClients(clients.filter((client) => client.id !== id));
    }


    const editClientId = async (id, name, rfc, fiscal_address,email,address, contact_phone, contact_email, contact_name,status) => {
        const { data } = await axios.put(`/api/clients/${id}`, {
            name,
            rfc,
            fiscal_address,
            email,
            address,
            contact_phone,
            contact_email,
            contact_name,
            status
        });
        setClients(clients.map((client) => client.id === id ? data : client));
    }

    const createOffer = async (project_name, fileName, final_client, activity_resumen, client_id) => {
        const body = new FormData();
        body.append("project_name", project_name);
        body.append("fileName", fileName);
        body.append("final_client", final_client);
        body.append("activity_resumen", activity_resumen);
        body.append("client_id", client_id);
        const response = await fetch("/api/offers/", {
            method: "POST",
            body
        });
        const data = await response.json();
         setOffers([...offers, data]);
         getOffers(data);
    }

    const editOfferId = async (id, project_name, final_client, activity_resumen,status, client_id) => {

        const { data } = await axios.put(`/api/offers/${id}`, {
            project_name,
            final_client,
            activity_resumen,
            status,
            client_id
        });
        setOffers(offers.map((offer) => offer.id === id ? data : offer));
    }

    const createOrder = async (project_name, fileName, final_client, activity_resumen, client_id) => {
        const body = new FormData();
        body.append("project_name", project_name);
        body.append("fileName", fileName);
        body.append("final_client", final_client);
        body.append("activity_resumen", activity_resumen);
        body.append("client_id", client_id);
        const response = await fetch("/api/orders/", {
            method: "POST",
            body
        });
        const data = await response.json();
        setOrders([...orders, data]);
        getOrders(data);
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
                createClient,
                removedClient,
                editClientId,
                
                offer,
                offers,
                createOffer,
                editOfferId,

                orders,
                order,


                handleSetOffer,
                handleSetClient,
                handleSetOrder,

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