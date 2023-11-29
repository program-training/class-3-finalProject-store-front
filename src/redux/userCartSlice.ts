import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserCart, IProduct } from "../types";

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
    addProductToCart: (state, action: PayloadAction<IProduct>) => {
      state.cart.productsCart.push(action.payload);
    },
    removeProductFromCart: (state, action: PayloadAction<string>) => {
      state.cart.productsCart = state.cart.productsCart.filter((product) => product._id !== action.payload);
    },
    setProductQuantity: (state, action: PayloadAction<string>) => {
      const product = state.cart.productsCart.find((product) => product._id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },
  },
});

export const { upDateUserCart, addProductToCart, removeProductFromCart, setProductQuantity } = userCartSlice.actions;
export default userCartSlice.reducer;
