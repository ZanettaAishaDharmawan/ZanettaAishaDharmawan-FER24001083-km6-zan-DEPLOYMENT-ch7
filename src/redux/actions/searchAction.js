import axios from "axios";
import {
  setSearchResults,
  setTotalPages,
} from "../reducers/searchReducer";

const API_KEY = "de1e0b98496c6434dd3e14f9554f5287";

export const getSearchResults = (searchTerm, currentPage) => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage}&include_adult=false`
    );
    dispatch(setSearchResults(response.data.results));
    dispatch(setTotalPages(response.data.total_pages));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};
