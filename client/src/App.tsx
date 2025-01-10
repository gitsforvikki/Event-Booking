import "./global.css";
import { Route, Routes } from "react-router-dom";
import { RegisterUser } from "./modules/user/RegisterUser";
import { LoginUser } from "./modules/user/LoginUser";
import { Home } from "./layout/homePage/Home";
import { FreeEvents } from "./modules/event/FreeEvents";
import { ProEvents } from "./modules/event/ProEvents";

import { EventDetails } from "./modules/event/EventDetails";
import { Footer } from "./layout/footer/Footer";
import { MainNavbar } from "./layout/navbar/MainNavbar";

export default function App() {
  return (
    <>
      <MainNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/free-events" element={<FreeEvents />} />
        <Route path="/pro-events" element={<ProEvents />} />
        <Route path="/event/:id" element={<EventDetails />} />
      </Routes>
      <Footer />
    </>
  );
}
