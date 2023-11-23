// redux store
import { configureStore } from "@reduxjs/toolkit";
import userCartReducer from "./userCartSlice";
export const store = configureStore({
  reducer: {
    userCart: userCartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
