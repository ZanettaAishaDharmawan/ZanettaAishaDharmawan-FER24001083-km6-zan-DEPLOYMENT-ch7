import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";
import Login from "./Login";
import SearchResults from "./SearchResults";
import Register from "./Register";
import NowPlaying from "./NowPlaying";
import TopRated from "./TopRatedPage";
import Popular from "./PopularPage"
import ProfileUser from "./ProfileUser";
import { GoogleOAuthProvider } from '@react-oauth/google';
export default function Route() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/detail",
      element: <Detail />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/search-results",
      element: <SearchResults />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/now-playing",
      element: <NowPlaying />,
    },
    {
      path: "/top-rated",
      element: <TopRated />,
    },
    {
      path: "/popular",
      element: <Popular />,
    },
    {
      path: "/profile",
      element: <ProfileUser />,
    },
  ]);

 return <GoogleOAuthProvider clientId="273002041171-6eji9p3ehf78mnopt309nv4750h32t0j.apps.googleusercontent.com">
  <RouterProvider router={router} />
</GoogleOAuthProvider>
}
