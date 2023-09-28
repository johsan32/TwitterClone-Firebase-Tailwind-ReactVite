import { createAsyncThunk } from "@reduxjs/toolkit";
import { options, follower, following, global } from "../components/constants/constant";
import axios from "axios";

export const getTrend = createAsyncThunk("getTrend", async () => {
 try {
    const res = await axios.request(options);

console.log(res.data);
  return res.data[0].trends;
}
catch
    (error) {
        console.error("trend isteği başarısız oldu:", error);
        throw error;
}
});

export const getFollowers = createAsyncThunk("getFollowers", async () => {
  try {
    const res = await axios.request(follower);
    console.log(res.data.results);
    const newData = res.data.results.map((follow) => ({
      id: follow.user_id,
      img: follow.profile_pic_url,
      name: follow.name,
      username: follow.username,
    }));
    return newData;
  } catch (error) {
    console.error("Followers isteği başarısız oldu:", error);
    throw error;
  }
});
export const getFollowing= createAsyncThunk("getFollowing", async () => {
    try {
      const res = await axios.request(following);
      setTimeout(res,5000)
      console.log(res.data.results);
      const newData = res.data.results.map((following) => ({
        id: following.user_id,
        img: following.profile_pic_url,
        name: following.name,
        username: following.username,
      }));
      return newData;
    } catch (error) {
      console.error("Followers isteği başarısız oldu:", error);
      throw error;
    }
  });
export const fetchAllData = createAsyncThunk("fetchAllData", async (_, { dispatch }) => {
    try {
      await Promise.all([dispatch(getTrend()), dispatch(getFollowers()), dispatch(getFollowing())]);

      console.log("Her üç işlem de tamamlandı");
    } catch (error) {
      console.error("Her üç işlem de başarısız oldu:", error);
      throw error;
    }
  });

  export const getGlobal = createAsyncThunk("getGlobal  ", async () => {
  try {
    const res = await axios.request(global);
    console.log(res.data.trends);
    return res.data.trends;
  } catch (error) {
    console.error(error);
  }
});