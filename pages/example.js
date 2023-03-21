import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffers } from "./features/offers/offerSlice";

const ClientsList = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.offers);
  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  if (loading) {
    return <div>Loading clients...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {data.map((offer) => (
        <div key={offer.id}>{offer.project_name}</div>
      ))}
    </div>
  );
};

export default ClientsList;
