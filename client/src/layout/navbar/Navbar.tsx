import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/slices/userSlice";

export const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );

  const handleLogoutUser = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gray-800 text-white py-4 px-8 flex items-center justify-between">
      <div className="flex space-x-8">
        <Link to="/" className="text-xl font-bold">
          Website Name
        </Link>
        <div className="flex space-x-4">
          <Link to="/free-events" className="text-lg hover:text-gray-300">
            Free Events
          </Link>
          <Link to="/pro-events" className="text-lg hover:text-gray-300">
            Pro Events
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {isAuthenticated ? (
          <div className="flex items-center text-lg hover:text-gray-300">
            <img
              src={user?.avatar}
              alt="user"
              className="w-8 h-8 rounded-full mr-3"
            />{" "}
            {user?.name} <span className="text-gray-400 mx-3">|</span>{" "}
            <button
              onClick={handleLogoutUser}
              className="bg-[#e67124] text-white px-4 py-2 rounded hover:bg-[#b35111]"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link
              to="/register"
              className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
