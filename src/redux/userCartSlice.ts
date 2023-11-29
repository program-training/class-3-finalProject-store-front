import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserCart } from "../types";

interface ReduxUserCart {
  cart: UserCart;
}

const userCartState: ReduxUserCart = {
  cart: {
    productsCart: [],
  },
};

export const userCartSlice = createSlice({
  name: "userCart",
  initialState: userCartState,
  reducers: {
    upDateUserCart: (state, action: PayloadAction<UserCart>) => {
      state.cart.productsCart = action.payload.productsCart;
    },
  },
});

export const { upDateUserCart } = userCartSlice.actions;
export default userCartSlice.reducer;
