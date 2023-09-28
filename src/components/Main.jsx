import { useEffect, useState } from "react";
import TweetForm from "./TweetForm";
import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";
import Post from "./Post";
import Loading from "./Loading";

const Main = () => {
  const [tweets, setTweets] = useState(null);
  const tweetCol = collection(db, "tweets");

  useEffect(() => {
    const queryOption = query(tweetCol, orderBy("createdAt", "desc"));
    onSnapshot(queryOption, (snapshot) => {
      const tempTweets = [];
      snapshot.forEach((doc) => tempTweets.push({ ...doc.data(), id: doc.id }));
      setTweets(tempTweets);
    });
  }, []);

  return (
    <main className="main flex-grow ml-20 border-l border-r border-gray-700 max-w-2xl sm:ml-[20px] xl:ml-[340px] overflow-y-scroll h-screen">
      <header className=" text-[#d9d9d9] flex-col items-center sm:justify-between py-2 px-3 top-0 z-50 sticky bg-black font-bold text-xl">
        Home
        <div className="flex items-cnter justify-evenly h-full border-b-2 border-gray-800">
          <p className="cursor-pointer hover:bg-zinc-700 w-[50%] h-full text-center pb-4 text-gray-500 font-medium">
            For you
          </p>
          <p className="cursor-pointer hover:bg-zinc-700  w-[50%] text-center pb-4 text-white font-medium underline-offset-8 underline following-link">
            Following
          </p>
        </div>
      </header>

      <TweetForm />
      {!tweets && <Loading />}
      <div className=" top-0 ">
        {tweets?.map((tweet) => (
          <Post key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </main>
  );
};

export default Main;
