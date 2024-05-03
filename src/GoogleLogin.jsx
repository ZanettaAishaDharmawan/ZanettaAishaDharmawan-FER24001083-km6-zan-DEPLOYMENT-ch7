import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin as Google } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { registerLoginWithGoogleAction } from "./redux/actions/authAction2";

function GoogleLogin({ buttonText }) {
  const navigate = useNavigate();
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) =>
      dispatch(
        registerLoginWithGoogleAction(responseGoogle.access_token, navigate)
      ),
  });
  const handleGoogleLogin = () => {
    // Panggil fungsi loginWithGoogle() atau fungsi serupa di sini
    loginWithGoogle();
    // Tampilkan pesan alert setelah tombol diklik
    alert("Login dengan Google sukses!");
    navigate("/")
  };

  return (
    <>
      <button
        className="mt-8 w-[500px] h-[50px]  bg-slate-200 hover:bg-slate-300 rounded-md text-black text-lg flex flex-row items-center justify-center"
        onClick={handleGoogleLogin}
      >
        <FcGoogle className="mr-2 mt-[0.1rem]" />
        {buttonText}
      </button>
      {/* <Google
        onSuccess={(credentialResponse) => {
          localStorage.setItem("token", credentialResponse.credential);
          localStorage.setItem("login", "google component");
          navigate("/", {
            state: { token: credentialResponse.credential },
          });
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      /> */}
    </>
  );
}

export default GoogleLogin;
