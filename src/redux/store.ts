import { configureStore } from "@reduxjs/toolkit";
import userCartReducer from "./userCartSlice";
import searchReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    userCart: userCartReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
