import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slices/userSlice";
import { AppDispatch } from "../../redux/store";

export const RegisterUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [userData, setUserData] = useState({
    name: "",
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
    dispatch(registerUser(userData));
  };

  return (
    <>
      <pre>{JSON.stringify(userData)}</pre>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          className="bg-white shadow-md rounded p-6 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded border-gray-300 outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your name"
              required
            />
          </div>

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
    </>
  );
};
