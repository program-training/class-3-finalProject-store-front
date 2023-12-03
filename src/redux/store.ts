import { configureStore } from "@reduxjs/toolkit";
import userCartReducer from "./userCartSlice";
import searchReducer from "./searchSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
  reducer: {
    userCart: userCartReducer,
    search: searchReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
