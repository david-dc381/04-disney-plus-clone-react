/* import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import movieReducer from '../features/movie/movieSlice';
import userSlice from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    movie: movieReducer,
    user: userSlice
  },
}); */

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import movieReducer from "../features/movie/movieSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    movie: movieReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
