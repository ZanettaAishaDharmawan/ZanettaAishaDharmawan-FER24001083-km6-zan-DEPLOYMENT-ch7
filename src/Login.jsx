import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { login } from "./redux/actions/authAction";
import { loginUser, fetchUserData} from "./redux/actions/authAction2";
// import { loginUser } from "./redux/actions/authAction2";
// import { fetchUserData } from "./redux/actions/authAction";
import { Link } from "react-router-dom";
import {
  // setNavbarBackground,
  toggleDropdown,
} from "./redux/reducers/navbarReducer";

import GoogleLogin from "./GoogleLogin";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await dispatch(login(email, password, navigate));
      // dispatch(fetchUserData());
      // dispatch(toggleDropdown(false)); // Tutup dropdown setelah berhasil masuk

      await dispatch(loginUser({email, password}, navigate));
      dispatch(fetchUserData());
      dispatch(toggleDropdown(false));

      // navigate("/"); 
    } catch (error) {
      console.error("Error during login: ", error);
    }
  };

  return (
    <div className="flex flex-row">
      <div>
        <div className="container w-[90vh] bg-[#e73939] h-screen flex justify-center items-center">
          <div className="text-center">
            <img
              alt="Hero"
              className="px-8 py-4 md:px-32 md:py-10 mx-auto"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-4 text-white">
              MOFLIX
            </h1>
            <h3 className="text-lg md:text-xl font-medium text-white">
              Step into a world of entertainment with Moflix at your fingertips.
            </h3>
          </div>
        </div>
      </div>
      <div className="container flex flex-col justify-center items-center h-screen self-center">
        <div>
          <h1 className="text-5xl font-bold mb-4 text-black">Welcome Back</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <br />
            <label className="pb-3 pt-4">Email: </label>
            <input
              placeholder="email"
              value={email}
              className="container w-[500px] h-[50px] bg-slate-100 rounded-md p-4"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label className="pb-3">Password: </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} 
                placeholder="password"
                value={password}
                className="container w-[500px] h-[50px] bg-slate-100 rounded-md p-4 pr-10" 
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            <br />
            {/* {error && <div className="text-red-500">{error}</div>}  */}
            {/* Display error if exists */}

            <button
              className="w-[500px] h-[50px] bg-[#e73939] hover:bg-[#9a0101] rounded-md text-white text-lg"
              type="submit"
            >
              Login
            </button>
            <div className="border-b-2 pt-5"></div>
            <GoogleLogin buttonText="Login with Google" />

            <div className="flex flex-row items-center justify-center pt-4">
              <h1>Don't have an account yet?</h1>

              <Link to="/register" className="pl-1 font-bold">
                Register Here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
