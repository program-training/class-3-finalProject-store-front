// import { useState } from "react";
import { HeaderUnavailable } from "./HeaderUnavailable";
import { HeaderAvailable } from "./HeaderAvailable";

const HeaderRouter = () => {
//   const [available, setAvailable] = useState(false);
  const userToken = localStorage.getItem("token");

  if (!userToken) {
    return <HeaderUnavailable/>
    // setAvailable(false);
  } else {
    return <HeaderAvailable/>
    // setAvailable(true);
  }

//   return <>{(available && <HeaderAvailable />) || <HeaderUnavailable />}</>;
// return (<>{available?<HeaderAvailable />:<HeaderUnavailable />}</>)
};

export default HeaderRouter;
