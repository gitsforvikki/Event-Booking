import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { getSingleEvent } from "../../redux/slices/eventSlice";

export const EventDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  // Fetch event dataon page loading
  useEffect(() => {
    dispatch(getSingleEvent(String(id)));
  }, [id, dispatch]);

  const eventStore = useSelector((state: RootState) => state.event);
  const { singleEvent, loading } = eventStore;

  return (
    <div className="custom-container">
      <pre>{JSON.stringify(singleEvent)}</pre>
      {loading ? (
        <h2 className="text-3xl italic mt-32  text-center">
          Loading..........
        </h2>
      ) : (
        <h2>{singleEvent?.name}</h2>
      )}
    </div>
  );
};
