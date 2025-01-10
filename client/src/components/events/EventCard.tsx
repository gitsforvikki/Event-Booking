import { Link } from "react-router-dom";
import rightArrow from "../../public/rightArrow.svg";
import "./style.css";

type EventProps = {
  eventCard: {
    _id: string;
    user: string;
    name: string;
    image: string;
    date: string;
    type: string;
    price: number;
    info: string;
  };
};

export const Eventcard = ({ eventCard }: EventProps) => {
  const { _id, name, image } = eventCard;

  return (
    <div className="border border-gray-400 p-3 rounded-xl bg-slate-200 h-full">
      <div className="bg-[#052D52] p-5 rounded-xl h-full">
        <div className="flex flex-col gap-x-3 gap-y-6">
          <div className="transform transition-transform duration-300 hover:scale-95 h-[248px] ">
            <img
              src={image}
              alt={name}
              className="h-full rounded-xl object-fill w-full"
            />
          </div>
          <div className="gradiant-border" />
          <div className="flex justify-between">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-300">
              {name}
            </h2>
            <div className="flex items-center transform transition-transform duration-300 hover:translate-x-2">
              <Link to={`/event/${_id}`} className="text-gray-400 text-xl">
                Know more
              </Link>
              <img
                src={rightArrow}
                alt="right arrow"
                className="ml-2 w-4 h-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
