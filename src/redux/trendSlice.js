import { createSlice } from "@reduxjs/toolkit";
import { getFollowers, getTrend, getFollowing, getGlobal } from "./actions";

const initialState = {
  trend: [],
  isLoading: true,
  isError: false,
  global: [],
  isLoadingGl: true,
  isErrorGl: false,
  follower:[],
  isFollowLoad: true,
  isFollowErr: false,
  following:[],
  isFollowingLoad: true,
  isFollowingErr: false,
};
export const trendSlice = createSlice({
  name: "trendSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTrend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.trend = action.payload;
      })
      .addCase(getTrend.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getFollowers.pending, (state) => {
        state.isFollowLoad = true;
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
       console.log(action);
        state.isFollowLoad = false;
        state.isFollowErr = false;
        state.follower = action.payload;
      })
      .addCase(getFollowers.rejected, (state) => {
        state.isFollowLoad= false;
        state.isFollowErr= true;
      })
      .addCase(getFollowing.pending, (state) => {
        state.isFollowingLoad = true;
      })
      .addCase(getFollowing.fulfilled, (state, action) => {
       console.log(action);
        state.isFollowingLoad = false;
        state.isFollowingErr = false;
        state.following = action.payload;
      })
      .addCase(getFollowing.rejected, (state) => {
        state.isFollowingLoad= false;
        state.isFollowingErr= true;
      })
      .addCase(getGlobal.pending, (state) => {
        state.isLoadingGl = true;
      })
      .addCase(getGlobal.fulfilled, (state, action) => {
        state.isLoadingGl = false;
        state.isErrorGl = false;
        state.global = action.payload;
      })
      .addCase(getGlobal.rejected, (state) => {
        state.isLoadingGl = false;
        state.isErrorGl = true;
      });
  },
  reducers: {},
});

export default trendSlice.reducer;

