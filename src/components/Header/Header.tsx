import { HeaderUnavailable } from "./HeaderUnavailable";
import { HeaderAvailable } from "./HeaderAvailable";

const HeaderRouter = () => {
  const userToken = localStorage.getItem("token");

  if (!userToken) {
    return <HeaderUnavailable />;
  } else {
    return <HeaderAvailable />;
  }
};

export default HeaderRouter;
