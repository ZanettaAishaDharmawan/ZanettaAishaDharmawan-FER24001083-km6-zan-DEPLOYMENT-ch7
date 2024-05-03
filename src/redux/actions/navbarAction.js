import axios from "axios";
import { setProfile } from "../reducers/navbarReducer";

const API_KEY = "de1e0b98496c6434dd3e14f9554f5287";

export const getProfile = () => async (dispatch, getState) => {
    try {
      const response = await axios.get(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
    );
      console.log("response", response.data);
      dispatch(setProfile(response.data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.message);
        return;
      }
      alert(error.message);
    }
  };
