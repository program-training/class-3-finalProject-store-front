import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  name: string;
  id:string;
}

const initialState: SearchState = {
  name: "",
  id:"",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      state.id = action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
