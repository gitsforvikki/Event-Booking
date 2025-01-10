import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProEvents } from "../../redux/slices/eventSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { Eventcard } from "../../components/events/EventCard";
import { useNavigate } from "react-router-dom";

interface Event {
  _id: string;
  user: string;
  name: string;
  image: string;
  date: string;
  type: "FREE" | "PRO";
  price: number;
  info: string;
  created: string;
  __v: number;
}

export const ProEvents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const eventStore = useSelector((state: RootState) => state.event);
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  const { events, loading } = eventStore;

  useEffect(() => {
    dispatch(getProEvents());
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [dispatch]);

  return (
    <div className="custom-container">
      {loading ? (
        <h2 className="text-3xl italic mt-32  text-center">
          Loading..........
        </h2>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event: Event) => (
            <div key={event._id}>
              <Eventcard eventCard={event} />
            </div>
          ))}
        </div>
      )}
      <h1>Pro events</h1>
    </div>
  );
};
