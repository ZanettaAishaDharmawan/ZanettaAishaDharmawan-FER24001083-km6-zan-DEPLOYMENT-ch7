import axios from "axios";

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: "LOGOUT" });
};

export const login = (email, password, navigate) => async (dispatch) => {
  dispatch({ type: "LOGIN_REQUEST" });

  try {
    const response = await axios.post(
      "https://shy-cloud-3319.fly.dev/api/v1/auth/login",
      { email, password }
    );

    if (response.status === 200) {
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      dispatch({ type: "LOGIN_SUCCESS", payload: token });
      // Redirect to home page after successful login
      console.log("token", token);
      navigate("/", { state: { token: token } });
    } else {
      dispatch({ type: "LOGIN_FAILURE", payload: "Login failed" });
    }
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error.message || "Login failed",
    });
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
    // Dispatch an action to update user data in the Redux store
    dispatch(setUserData(userData));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Token expired or user not logged in
    } else {
      // An error occurred while fetching user data
      console.error("Error: ", error);
    }
  }
};


export const register =
  (name, email, password, navigate) => async (dispatch) => {
    try {
      const response = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
        { name, email, password }
      );

      if (response.status === 200) {
        const token = response.data.data.token;
        // localStorage.setItem("Register", "Register");
        dispatch(registerSuccess(token));
        navigate("login");
        // return token;
      } else {
        dispatch(registerFailure(response.data.message || "Register failed"));
      }
    } catch (error) {
      dispatch(registerFailure(error.message || "Register failed"));
    }
  };


export const googleLogin = (accessToken, navigate) => async (dispatch) => {
  dispatch(googleLoginRequest());
  
  try {
    const response = await axios.post(
      "https://shy-cloud-3319.fly.dev/api/v1/auth/google",
      { access_token: accessToken }
    );

    if (response.status === 200) {
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      dispatch(googleLoginSuccess(token));
      navigate("/");
    } else {
      dispatch(googleLoginFailure("Google login failed"));
    }
  } catch (error) {
    dispatch(googleLoginFailure(error.message || "Google login failed"));
  }
};

export const GOOGLE_LOGIN_REQUEST = "GOOGLE_LOGIN_REQUEST";
export const GOOGLE_LOGIN_SUCCESS = "GOOGLE_LOGIN_SUCCESS";
export const GOOGLE_LOGIN_FAILURE = "GOOGLE_LOGIN_FAILURE";

export const googleLoginRequest = () => ({
  type: GOOGLE_LOGIN_REQUEST,
});

export const googleLoginSuccess = (token) => ({
  type: GOOGLE_LOGIN_SUCCESS,
  payload: token,
});

export const googleLoginFailure = (error) => ({
  type: GOOGLE_LOGIN_FAILURE,
  payload: error,
});

const registerSuccess = (token) => ({
  type: "REGISTER_SUCCESS",
  payload: token,
});

const registerFailure = (error) => ({
  type: "REGISTER_FAILURE",
  payload: error,
});

export const setUserData = (userData) => {
  return {
    type: "SET_USER_DATA",
    payload: userData,
  };
};