import { useContext } from "react";
import  AdminContext  from "../context/AdminProvider";

export const useAdmin = () => {
    
    return useContext(AdminContext)
}

export default useAdmin