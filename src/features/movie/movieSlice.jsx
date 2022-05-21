import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  /* recommend: null,
  newDisney: null,
  original: null,
  trending: null, */
}

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
      /* state.recommend = action.payload.recommend;
      state.newDisney = action.payload.newDisney;
      state.original = action.payload.original;
      state.trending = action.payload.trending; */
    }
  }
})

export const { setMovies } = movieSlice.actions;

export const selectMovies = (state) => state.movie.movies;

export default movieSlice.reducer;