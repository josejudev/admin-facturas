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

    //Get the user logged
    const [user, setUser] = useState({});


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





    return (
        <AdminContext.Provider
            value={{
                clients,
                client,
                offer,
                offers,
                handleSetOffer,
                handleSetClient,
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