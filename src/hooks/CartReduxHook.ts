import axios from "axios";
import { useAppDispatch } from "../redux/hooks";
import { upDateUserCart } from "../redux/userCartSlice";
import { CartHookObgect } from "../types";

const useUserCartRedux = () => {
  const dispatch = useAppDispatch();

  const fetchCart = async (cartHookObgect: CartHookObgect) => {
    const { method, search, cartItem, token } = cartHookObgect;
    const headers: { [key: string]: string } = {};
    if (token) {
      headers["authorization"] = token;
    }
    try {
      const response = await axios({
        method,
        url: `${import.meta.env.VITE_BASE_URL}/api/carts${search ? `${search}` : ""}`,
        data: { cartItem: cartItem },
        headers: headers as Record<string, string>,
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

export default useUserCartRedux;
