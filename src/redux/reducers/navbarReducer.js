import { createSlice } from "@reduxjs/toolkit";
import { setSearchTerm } from "./searchReducer"
const initialState = {
  profile: null,
  navbarBackground: "bg-background",
  dropdownVisible: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setNavbarBackground: (state, action) => {
      state.navbarBackground = action.payload;
    },
    toggleDropdown: (state) => {
      state.dropdownVisible = !state.dropdownVisible;
    },
  },
});

export const { setProfile, setNavbarBackground, toggleDropdown } = navbarSlice.actions;

export default navbarSlice.reducer;
