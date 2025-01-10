import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFreeEvents } from "../../redux/slices/eventSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { Eventcard } from "../../components/events/EventCard";

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

export const FreeEvents = () => {
  const dispatch = useDispatch<AppDispatch>();
  const eventStore = useSelector((state: RootState) => state.event);

  const { events, loading } = eventStore;

  useEffect(() => {
    dispatch(getFreeEvents());
  }, [dispatch]);

  return (
    <div className="custom-container flex flex-col gap-y-6">
      <div className="flex justify-center items-center mt-10">
        <h1 className="text-3xl text-gray-800">Free Events</h1>
      </div>
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
    </div>
  );
};
