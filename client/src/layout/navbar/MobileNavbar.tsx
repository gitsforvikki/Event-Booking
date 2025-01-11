import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { afterLoginNavData, beforeLoginNavData } from "./constant";
import burger from "../../public/burger.svg";
import cross from "../../public/cross.svg";
import { logout } from "../../redux/slices/userSlice";

export const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  return (
    <div className="bg-gray-800 ">
      <div className="custom-container flex justify-between items-center max-h-[200px]">
        <Link to="/" className="text-xl font-bold text-white">
          Website Name
        </Link>
        <div className="max-w-[40px] w-full" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <img src={cross} alt="burger" className="cursor-pointer" />
          ) : (
            <img src={burger} alt="burger" className="cursor-pointer" />
          )}
        </div>
      </div>
      <div
        className={`fixed top-10 left-0 z-50 w-full ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="bg-gray-800 text-white py-4 px-8 flex items-center justify-between">
          {isAuthenticated ? MenuListAfterLogin() : menuListBeforeLogin()}
        </div>
      </div>
    </div>
  );
};

const menuListBeforeLogin = () => {
  return (
    <ul className="flex flex-col gap-y-5">
      {beforeLoginNavData.map((menuItem) => (
        <li key={menuItem.title}>
          <Link to={menuItem.path} className="text-white">
            {menuItem.title}{" "}
          </Link>
        </li>
      ))}
    </ul>
  );
};
const MenuListAfterLogin = () => {
  const dispatch = useDispatch();
  const hanleLogoutUser = () => {
    dispatch(logout());
  };
  return (
    <ul className="flex flex-col gap-y-5 w-full">
      {afterLoginNavData.map((menuItem) => (
        <li key={menuItem.title}>
          <Link to={menuItem.path} className="text-white">
            {menuItem.title}{" "}
          </Link>
        </li>
      ))}
      <li className="flex justify-between ">
        {/* <div className="text-white flex items-center">
          <img
            src={user?.avatar}
            alt="user"
            className="w-8 h-8 rounded-full mr-3"
          />{" "}
          {user?.name}
        </div> */}
        <li>
          <Link
            onClick={hanleLogoutUser}
            to="/"
            className="bg-[#e67124] text-white px-4 py-2 rounded hover:bg-[#b35111]"
          >
            Logout
          </Link>
        </li>
      </li>
    </ul>
  );
};
