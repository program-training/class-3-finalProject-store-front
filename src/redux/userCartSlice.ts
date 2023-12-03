import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserCart } from "../types";

interface ReduxUserCart {
  cart: UserCart;
}

const userCartState: ReduxUserCart = {
  cart: {
    productsCart: [
      {
        userId: ``,
        product: {
          _id: ``,
          name: `string`,
          salePrice: 1,
          quantity: 1,
          description: `string`,
          category: `string`,
          discountPercentage: 1,
          image: {
            large: `string`,
            medium: `string`,
            small: `string`,
            alt: `string`,
          },
        },
      },
    ],
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
