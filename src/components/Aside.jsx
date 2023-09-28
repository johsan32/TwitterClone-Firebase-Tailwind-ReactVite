import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  getFollowers,
  getTrend,
  getFollowing,
  getGlobal,
} from "../redux/actions";
import AsideHastag from "./AsideHastag";
import AsideFollowers from "./AsideFollowers";
import AsideFollowing from "./AsideFollowing";
import { useState } from "react";
import AsideHastagGlobal from "./AsideHastagGlobal";
const Aside = () => {
  const dispatch = useDispatch();
  const [showTrend, setShowTrend] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showGlobal, setShowGlobal] = useState(false);
  const state = useSelector((store) => store);

  const handleTrend = () => {
    setShowTrend(!showTrend);
    dispatch(getTrend());
  };
  const handleGlobal = () => {
    setShowGlobal(!showGlobal);
    dispatch(getGlobal());
  };
  const handleFollowers = () => {
    setShowFollowers(!showFollowers);
    dispatch(getFollowers());
  };
  const handleFollowing = () => {
    setShowFollowing(!showFollowing);
    dispatch(getFollowing());
  };

  return (
    <div className="hidden md:block ml-8 xl:w-[400px] py-1 space-y-5 min-h-[100vh]">
      <div className="py-1.5 bg-black z-50 pe-5">
        <div className="flex items-center bg-[#202327] p-3 rounded-full relative">
          <BsSearch className="text-gray-500 h-5 z-50" />
          <input
            type="text"
            className="bg-transparent placeholder-gray-500 outline-none text-[#d9d9d9]  absolute inset-0 pl-11 border border-transparent w-full focus:border-[#1d9bf0] rounded-full focus:bg-black focus:shadow-lg"
            placeholder="Search Twitter"
          />
        </div>
        <div className="flex flex-col items-start justify-start bg-[#242729] p-3 rounded-xl mt-5 relative">
          <h3 className="font-semibold text-2xl">Subscribe to Premium</h3>
          <p>
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </p>
          <button className="bg-sky-500 py-1 px-3 rounded-2xl mt-2 font-bold">
            Subscribe
          </button>
        </div>
        <div className=" p-3 rounded-lg mt-3 bg-[#242729]">
          <div className="flex flex-col content-center mt-1">
            <h4
              className="mb-2 text-xl font-bold cursor-pointer"
              onClick={handleGlobal}
            >
              Trends for you
              <span className="text-xs font-thin ps-2 text-gray-400">
                Trending in Worldwide
              </span>
            </h4>
            {showGlobal && <AsideHastagGlobal />}
          </div>
          {!showGlobal && (
            <p className="text-blue-500 cursor-pointer rounded-lg ps-2 hover:bg-slate-700 w-full">
              Show trends Worldwide
            </p>
          )}
        </div>
        <div className=" p-3 rounded-lg mt-3 bg-[#242729]">
          <div className="flex flex-col content-center mt-1">
            <h4
              className="mb-2 text-xl font-bold cursor-pointer"
              onClick={handleTrend}
            >
              Trends for you
              <span className="text-xs font-thin ps-2 text-gray-400">
                Trending in Turkey
              </span>
            </h4>
            {showTrend && <AsideHastag />}
          </div>
          {!showTrend && (
            <p className="text-blue-500 cursor-pointer rounded-lg ps-2 hover:bg-slate-700 w-full">
              Show trends
            </p>
          )}
        </div>
        <div className="p-3 rounded-lg mt-3 bg-[#242729]">
          <div className="flex flex-col content-center mt-1">
            <h4
              className="mb-2 text-xl font-bold cursor-pointer"
              onClick={handleFollowers}
            >
              Followers
            </h4>
            {showFollowers && <AsideFollowers />}
          </div>
          {!showFollowers && (
            <p className="text-blue-500 cursor-pointer rounded-lg ps-2 hover:bg-slate-700 w-full">
              Show followers
            </p>
          )}
        </div>
        <div className=" p-3 rounded-lg mt-3 bg-zinc-800">
          <div className="flex flex-col content-center mt-1">
            <h4
              className="mb-2 text-xl font-bold cursor-pointer"
              onClick={handleFollowing}
            >
              Following
            </h4>
            {showFollowing && <AsideFollowing />}
          </div>
          {!showFollowing && (
            <p className="text-blue-500 cursor-pointer rounded-lg ps-2 hover:bg-slate-700 w-full">
              Show following
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Aside;
