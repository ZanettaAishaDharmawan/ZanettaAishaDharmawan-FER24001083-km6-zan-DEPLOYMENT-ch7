// searchReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  searchResults: [],
  currentPage: 1,
  totalPages: 1,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
  },
});

export const {
  setSearchTerm,
  setSearchResults,
  setCurrentPage,
  setTotalPages,
} = searchSlice.actions;

export default searchSlice.reducer;
