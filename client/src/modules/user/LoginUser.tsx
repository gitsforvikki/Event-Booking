import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/userSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

interface UserData {
  email: string;
  password: string;
}

export const LoginUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", userData);
    // Add your submission logic here
    dispatch(loginUser(userData));
  };

  const user = useSelector((state: RootState) => state.user);
  const { isAuthenticated } = user;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white shadow-md rounded p-6 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded border-gray-300 outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded border-gray-300 outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded shadow hover:bg-indigo-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
