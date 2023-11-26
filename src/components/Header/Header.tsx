// import { useState } from "react";
import { HeaderUnavailable } from "./HeaderUnavailable";
import { HeaderAvailable } from "./HeaderAvailable";

const HeaderRouter = () => {
  //   const [available, setAvailable] = useState(false);
  const userToken = localStorage.getItem("token");

  if (!userToken) {
    return <HeaderUnavailable />;
  } else {
    return <HeaderAvailable />;
  }
};

export default HeaderRouter;
