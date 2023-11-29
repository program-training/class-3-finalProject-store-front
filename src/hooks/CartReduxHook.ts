import axios, { Method } from "axios";
import { useAppDispatch } from "../redux/hooks";
import { upDateUserCart } from "../redux/userCartSlice";

const UserCartRedux = (method: Method, search?: string) => {
  const dispatch = useAppDispatch();
  const getToken = localStorage.getItem("token");

  if (!getToken) {
    throw new Error("Token is not found");
  }

  const fetchCart = async () => {
    try {
      const response = await axios({
        method,
        url: `${import.meta.env.VITE_BASE_URL}/api/carts${search ? `/${search}` : ""}`,
        headers: {
          Authorization: `${getToken}`,
        },
      });

      if (response.statusText === "OK") {
        const cartData = response.data;
        dispatch(upDateUserCart(cartData));
      } else {
        throw new Error("Response is NOT OK");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return fetchCart;
};

export default UserCartRedux;