import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "./features/clients/clientSlice";

const ClientsList = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  if (loading) {
    return <div>Loading clients...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {data.map((client) => (
        <div key={client.id}>{client.name}</div>
      ))}
    </div>
  );
};

export default ClientsList;
