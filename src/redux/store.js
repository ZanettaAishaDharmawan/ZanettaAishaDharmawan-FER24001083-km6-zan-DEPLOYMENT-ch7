import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import movieReducer from "./reducers/movieReducer";
import navbarReducer from "./reducers/navbarReducer";
import searchReducer from "./reducers/searchReducer";
import authReducer from "./reducers/authReducer";
import auth2Reducer from "./reducers/auth2Reducer"
const rootReducers = combineReducers({
  movies: movieReducer,
  navbar: navbarReducer,
  search: searchReducer,
  auth: authReducer,
  auth2: auth2Reducer,
});

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["todo"],
  // blacklist: ["counter"],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);
