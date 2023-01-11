import { useState, useEffect, createContext } from "react";
import axios from "axios";

const AdminContext = createContext();


const AdminProvider = ({ children }) => {
    const [clients, setClients] = useState([]);

    const getClients = async () => {
        const { data } = await axios.get('/api/clients');
        setClients(data);
    }

    useEffect(() => {
        getClients();
    }, []);

    
    return (
        <AdminContext.Provider 
        value={{
            clients
        }}>
            {children}
        </AdminContext.Provider>
    )
}
export{
    AdminProvider
}

export default AdminContext;