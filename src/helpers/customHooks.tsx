import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateOrderDetails } from "../redux/orderSlice";
import { RootState } from "../redux/store";
import { ShippingDetails, OrderProduct, CartItem } from "../types";
import axios from "axios";

export const useHandleShippingDetailsSubmit = (details: ShippingDetails) => {
  const orderDetails = useAppSelector((state: RootState) => state.order.orderDetails);
  orderDetails.shippingDetails = details;
  const dispatch = useAppDispatch();
  dispatch(updateOrderDetails(orderDetails));
};

export const useHandleUpdatePriceOnRedux = () => {
  const orderDetails = useAppSelector((state: RootState) => state.order.orderDetails);
  const orderProducts = useAppSelector((state: RootState) => state.userCart.cart.productsCart);
  const price = () => {
    let price = 0;
    orderProducts.map(product => (price += product.product.salePrice));
    return price;
  };
  orderDetails.price = price();
  const dispatch = useAppDispatch();
  dispatch(updateOrderDetails(orderDetails));
};

export const useHandleConfirmOrder = () => {
  const orderDetails = useAppSelector((state: RootState) => state.order.orderDetails);
  const products = useAppSelector((state: RootState) => state.userCart.cart.productsCart);
  const currentDate = new Date();
  const currentTimeString = currentDate.toLocaleString();
  const userId = products[0].userId;
  const productsToSend = switchProductsToOrderProducts(products);
  orderDetails.cartItems = productsToSend;
  orderDetails.orderTime = currentTimeString;
  orderDetails.shippingDetails.userId = userId;
  const sendOrderResult = async () => {
    try {
      const sendOrder = await axios.post(`https://osm-1-2.onrender.com/api/orders`, orderDetails);
      sendOrder;
    } catch (error) {
      console.log(error);
    }
  };
  sendOrderResult();
};

const switchProductsToOrderProducts = (products: CartItem[]) => {
  const orderProducts: OrderProduct[] = [];
  products.map(product => {
    const { _id, name, description, salePrice, quantity } = product.product;
    const orderProduct: OrderProduct = {
      id: _id,
      name,
      description,
      price: salePrice,
      quantity,
    };
    orderProducts.push(orderProduct);
  });
  return orderProducts;
};
