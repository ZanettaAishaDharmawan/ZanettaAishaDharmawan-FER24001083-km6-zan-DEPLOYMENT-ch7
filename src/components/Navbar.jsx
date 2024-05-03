import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getSearchResults } from "../redux/actions/searchAction";
import {
  setNavbarBackground,
  toggleDropdown,
} from "../redux/reducers/navbarReducer";
import {
  setSearchTerm,
} from "../redux/reducers/searchReducer";
import { getProfile } from "../redux/actions/navbarAction";
import { fetchUserData, logoutUser} from "../redux/actions/authAction";

export default function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const navbarBackground = useSelector((state) => state.navbar.navbarBackground);
  const dropdownVisible = useSelector((state) => state.navbar.dropdownVisible);
  const currentPage = useSelector((state) => state.search.currentPage);
  const [searchInput, setSearchInput] = useState("");
  const [placeholder, setPlaceholder] = useState("Search movies...");
  const user = useSelector((state) => state.auth.userData);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch, user]); // Tambahkan user sebagai dependensi
  

  useEffect(() => {
    const searchTermFromURL = new URLSearchParams(location.search).get("query");
    dispatch(setSearchTerm(searchTermFromURL));
  }, [location.search, dispatch]);

  useEffect(() => {
    dispatch(getSearchResults(searchTerm, currentPage));
  }, [dispatch, searchTerm, currentPage]);

  useEffect(() => {
    setSearchInput(searchTerm);
  }, [searchTerm]);

  const handleSearch = () => {
    navigate(`/search-results?query=${searchInput}`);
    setPlaceholder("Search movies...");
    dispatch(toggleDropdown(false)); // Tutup dropdown setelah berhasil masuk

  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      dispatch(setNavbarBackground("bg-black bg-opacity-75"));
    } else {
      dispatch(setNavbarBackground("bg-background"));
    }
  };

  window.addEventListener("scroll", handleScroll);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleToggleDropdown = () => {
    dispatch(toggleDropdown(false));
  };

  return (
    <nav className={`py-5 fixed top-0 w-full z-10 px-12 ${navbarBackground}`}>
      <div className="flex justify-between items-center">
        <a href="/" className="text-red-500 text-xl font-bold">
          MOFLIX
        </a>
        <div className="hidden md:flex items-center gap-5">
          {user && (
            <div className="flex items-center gap-4">
              <div className="relative w-[600px]">
                <input
                  type="text"
                  placeholder={placeholder}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                      setPlaceholder(searchInput);
                    }
                  }}
                  className="bg-transparent text-white px-4 py-2 rounded-ld w-full focus:outline-none focus:ring focus:border-blue-200"
                />
                <button
                  onClick={handleSearch}
                  className="absolute inset-y-0 right-0 text-white px-4 py-2 rounded-r-md hover:bg-gray-700 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
          <div className="flex gap-4">
            {user ? (
              <div className="relative flex gap-4">
                <a href="/popular">
                  <p className="text-sm font-normal text-white cursor-pointer hover:text-primary hover:font-semibold">
                    Popular
                  </p>
                </a>
                <a href="/now-playing">
                  <p className="text-sm font-normal text-white cursor-pointer hover:text-primary hover:font-semibold">
                    Now Playing
                  </p>
                </a>
                <a href="/top-rated">
                  <p className="text-sm font-normal text-white cursor-pointer hover:text-primary hover:font-semibold">
                    Top Rated
                  </p>
                </a>
                <a
                  onClick={handleToggleDropdown}
                  className="text-white cursor-pointer hover:text-primary"
                >
                  <p className="text-sm font-normal text-white cursor-pointer hover:text-primary hover:font-semibold">
                    Hello, {user?.data?.name}
                  </p>
                </a>
                {dropdownVisible && (
                  <div className="absolute right-0 mt-10 w-48 bg-white rounded-md shadow-lg z-10">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 rounded-md  hover:bg-gray-100"
                    >
                      Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm  rounded-md  text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-4">
              
                <a href="/login">
                  <p className="text-sm font-normal text-white cursor-pointer hover:text-primary hover:font-semibold p-3">
                    Login
                  </p>
                </a>
                <a href="/register">
                  <p className="text-sm font-normal text-white cursor-pointer hover:text-primary hover:font-semibold border rounded-md p-3">
                    Register
                  </p>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
