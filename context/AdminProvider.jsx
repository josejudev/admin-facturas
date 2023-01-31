import { useState, useEffect, createContext } from "react";
import axios from "axios";

const AdminContext = createContext();


const AdminProvider = ({ children }) => {
    const [clients, setClients] = useState([]);
    const [offer, setOffer] = useState({});
    const [modal, setModal] = useState(false);

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

    
    return (
        <AdminContext.Provider 
        value={{
            clients,
            offer,
            handleSetOffer,
            modal,
            handleChangeModal
        }}>
            {children}
        </AdminContext.Provider>
    )
}
export{
    AdminProvider
}

export default AdminContext;