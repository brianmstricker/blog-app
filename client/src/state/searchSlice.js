import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  isLoading: false,
  error: false,
};

const searchSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = "";
    },
  },
});

export const { setSearchResults, clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
