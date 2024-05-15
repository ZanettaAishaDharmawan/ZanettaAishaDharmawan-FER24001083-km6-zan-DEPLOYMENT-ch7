import axios from "axios";
import {
  setAllMovies,
  setMovieDetail,
  setMovieReviews,
  setMovieVideos,
  setNowPlayingMovies,
  setRecommendationMovies,
  setTopRatedMovies,
} from "../reducers/movieReducer";

const API_KEY = "de1e0b98496c6434dd3e14f9554f5287";

export const getAllMovies = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&include_adult=false&api_key=${API_KEY}`
    );
    console.log("response All Movies", response.data.results);
    dispatch(setAllMovies(response.data.results));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }

  
};

export const getRecommendation = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${API_KEY}`
    );
    const recommendationMovies = response.data.results;
    dispatch(setRecommendationMovies(recommendationMovies));
    console.log('recommendationMovies', recommendationMovies)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getNowPlayingMovies = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${API_KEY}`
    );
    console.log("response now playing", response.data.results);
    dispatch(setNowPlayingMovies(response.data.results));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getTopRatedMovies = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`
    );
    console.log("response", response.data.results);
    dispatch(setTopRatedMovies(response.data.results));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getDetailMovie = (id) => async (dispatch, getState) => {
  try {
    console.log("id ACTIONNNNN", id);
    const id2 = getState().movies.movieId;
    console.log("id2", id2);
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${API_KEY}`
    );
    console.log("response", response);
    console.log('INIIIIII ISINYA')
    console.log('response.data', response.data)
    dispatch(setMovieDetail(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getMovieReviews = (id) => async (dispatch, getState) => {
  try {
    const id2 = getState().movies.movieId;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1&api_key=${API_KEY}`
    );
    console.log("response", response);
    dispatch(setMovieReviews(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getMovieVideos = (id) => async (dispatch, getState) => {
  try {
    const id2 = getState().movies.movieId;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=${API_KEY}`
    );
    console.log("response", response);
    dispatch(setMovieVideos(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};
