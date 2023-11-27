import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  value: string;
  id:string;
}

const initialState: SearchState = {
  value: "",
  id:"",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      state.id = action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
