import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import LoginImage from "./assets/Login.png";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  useEffect(() => {
    console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") !== null) {
      alert("You have already login");
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response_login = await fetch(
      "https://shy-cloud-3319.fly.dev/api/v1/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: password,
          email: email,
        }),
      }
    );
    const json_login = await response_login.json();

    if (response_login.ok) {
      const token = json_login.data.token;
      alert("Successfully login!");
      localStorage.setItem("login", "login");
      localStorage.setItem("token", token);
      navigate("/", { state: { token: token } });
    } else {
      setError(json_login?.message || "Login failed");
      console.log("Login failed:", json_login);
    }
  };

  return (
    <div className="flex flex-row">
      <div>
        <div className="container w-[90vh] bg-[#e73939] h-screen flex justify-center items-center">
          <div className="text-center">
            <img
              src={LoginImage}
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
                type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                placeholder="password"
                value={password}
                className="container w-[500px] h-[50px] bg-slate-100 rounded-md p-4 pr-10" // Add extra padding for the icon
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Text to toggle password visibility */}
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            <br />
            {error && <span className="text-red-500 pb-2">{error}</span>}

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
}
