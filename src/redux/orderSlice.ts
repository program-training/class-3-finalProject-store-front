import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../types";

interface OrderState {
  orderDetails: Order;
}

const initialState: OrderState = {
  orderDetails: {
    cartItems: [],
    orderTime: ``,
    status: ``,
    price: 0,
    shippingDetails: {
      userId: 0,
      address: ``,
      contactNumber: ``,
      orderType: ``,
    },
  },
};

export const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    updateOrderDetails: (state, action: PayloadAction<Order>) => {
      state.orderDetails = action.payload;
    },
  },
});

export const { updateOrderDetails } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
