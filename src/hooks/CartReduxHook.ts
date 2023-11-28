import axios, { Method } from "axios";
import { useAppDispatch } from "../redux/hooks";
import { upDateUserCart } from "../redux/userCartSlice";

const UserCartRedux = (method: Method) => {
  const dispatch = useAppDispatch();

  const getToken = localStorage.getItem("token");
  if (!getToken) {
    throw new Error("Token is not found");
  }
  const token = JSON.parse(getToken);

  const fetchCart = async () => {
    try {
      const response = await axios({
        method,
        url: `${import.meta.env.VITE_BASE_URL}/api/carts`,
        headers: {
          Authorization: `${token}`,
        },
      });

      const cartData = response.data;
      dispatch(upDateUserCart(cartData));
      console.log(cartData);
    } catch (err) {
      console.error(err);
    }
  };

  return fetchCart;
};

export default UserCartRedux;
