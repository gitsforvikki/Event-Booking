import useDeviceDetect from "../../hooks/useDeviceDetect";
import { MobileNavbar } from "./MobileNavbar";
import { Navbar } from "./Navbar";

export const MainNavbar = () => {
  const screenWidth = useDeviceDetect();
  return screenWidth < 768 ? <MobileNavbar /> : <Navbar />;
};
