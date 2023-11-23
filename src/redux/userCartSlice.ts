import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserCart } from "../types";

interface ReduxUserCart {
  userCartArr: UserCart[];
}
const userCartState: ReduxUserCart = {
  userCartArr: [],
};

export const userCartSlice = createSlice({
  name: "userCart",
  initialState: userCartState,
  reducers: {
    upDateUserCart: (state, action: PayloadAction<UserCart[]>) => {
      state.userCartArr = action.payload;
    },
  },
});
export const { upDateUserCart } = userCartSlice.actions;
export default userCartSlice.reducer;
