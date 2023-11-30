import Footer from "../Footer/Footer";
import { Outlet } from "react-router";
import { Header } from "./Header";

const LayersHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayersHeader;
