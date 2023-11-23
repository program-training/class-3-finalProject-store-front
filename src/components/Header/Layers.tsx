import Footer from "../Footer/Footer";
import { Outlet } from "react-router";
import HeaderRouter from "./Header";

const LayersHeader = () => {
  return (
    <>
      <HeaderRouter />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayersHeader;
