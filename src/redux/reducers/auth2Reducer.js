import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  // email: "",
  isLoggedin: false,
  token: localStorage.getItem("token") || null,
  user: null,
};

const authenticationSlicer = createSlice({
  name: "auth2",
  initialState,
  reducers: {
    // setEmail: (state, action) => {
    //     state.email;
    // },
    // setPassword: (state, action) => {
    //     state.password;
    // },
    setIsLoggedIn: (state, action) => {
      state.isLoggedin = action.payload;
    },
    setToken: (state, action) => {
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }

      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, setUserData } =
  authenticationSlicer.actions;

export default authenticationSlicer.reducer;
