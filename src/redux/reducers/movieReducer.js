import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  movies: [],
  nowPlayingMovies: [],
  topRatedMovies: [],
  movieId: null,
  movieReviews: null,
  movieVideos: null,
  movieDetail: null,
  searchKeyword: "",
  testSearch: "",
  allMoviesHoveredId: null,
  nowPlayingMoviesHoveredId: null,
  topRatedMoviesHoveredId: null,
  hoveredMoviesId:null,
};

const movieSlicer = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovieId: (state, action) => {
      state.movieId = action.payload;
    },
    setAllMovies: (state, action) => {
      state.movies = action.payload;
    },
    setMovieReviews: (state, action) =>{
      state.movieReviews = action.payload;
    },
    setMovieVideos: (state, action) =>{
      state.movieVideos = action.payload;
    },
    setNowPlayingMovies: (state, action) =>{
      state.nowPlayingMovies= action.payload;
    },
    setTopRatedMovies: (state, action) =>{
      state.topRatedMovies= action.payload;
    },
    setMovieDetail: (state, action) => {
      state.movieDetail = action.payload;
      //   state.movieId=123
      //   state.movies=[]
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    setAllMoviesHoveredId: (state, action) => {
      state.allMoviesHoveredId = action.payload;
    },
    setHoveredMoviesId: (state, action) => {
      state.hoveredMoviesId = action.payload;
    },
    setNowPlayingMoviesHoveredId: (state, action) => {
      state.nowPlayingMoviesHoveredId = action.payload;
    },
    setTopRatedMoviesHoveredId: (state, action) => {
      state.topRatedMoviesHoveredId = action.payload;
    },
    clearAllHoveredMoviesId: (state) => {
      state.allMoviesHoveredId = null;
    },
    clearNowPlayingMoviesHoveredId: (state) => {
      state.nowPlayingMoviesHoveredId = null;
    },
    clearTopRatedMoviesHoveredId: (state) => {
      state.topRatedMoviesHoveredId = null;
    }

  },
});

export const { setHoveredMoviesId, setMovieReviews, setMovieVideos, setAllMovies, setMovieId, setTopRatedMovies, setTopRatedMoviesHoveredId, clearTopRatedMoviesHoveredId, setMovieDetail, setSearchKeyword, setAllMoviesHoveredId, clearAllHoveredMoviesId, setNowPlayingMovies, setNowPlayingMoviesHoveredId , clearNowPlayingMoviesHoveredId } =
  movieSlicer.actions;

export default movieSlicer.reducer;
