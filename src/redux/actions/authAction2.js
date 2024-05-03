import axios from "axios";
import { setToken, setUserData } from "../reducers/auth2Reducer";

export const loginUser = (loginData, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://shy-cloud-3319.fly.dev/api/v1/auth/login`,
      loginData,
      { "Content-Type": "application/json" }
    );
    const { token } = response?.data?.data;

    dispatch(setToken(token));
    navigate("/");
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error?.response?.data?.message);
      return;
    }
    console.error(error.message);
  }
};

export const fetchUserData = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const userData = response.data;
    console.log("User profile: ", userData);
    dispatch(setUserData(userData));
  } catch (error) {
    if (error.response && error.response.status === 401) {
    } else {
      console.error("Error: ", error);
    }
  }
};

export const registerLoginWithGoogleAction =
  (accessToken, navigate) => async (dispatch) => {
    try {
      const response = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/google",
        { access_token: accessToken },
        { headers: { "Content-Type": "application/json" } }
      );
      const { token } = response.data.data;
      dispatch(setToken(token));
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.message);
        return;
      }
      console.error("Error registering/login with Google:", error);
      alert(error.message);
    }
  };
