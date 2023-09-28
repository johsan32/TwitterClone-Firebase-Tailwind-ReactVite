import { BsThreeDots } from "react-icons/bs";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { CgLoadbarSound } from "react-icons/cg";
import { RiQuillPenLine } from "react-icons/ri";
import { auth, db } from "../firebase/config";
import moment from "moment/moment";
import "moment/locale/tr";
import { toast } from "react-toastify";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import ModalComment from "./ModalComment";
import Comments from "./Comments";

const Post = ({ tweet }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showmodal, setShowModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  const [isRetweet, setIsRetweet] = useState(false);
  const [showCommentsData, setShowCommentsData] = useState(false);
  const [retweetedPost, setRetweetedPost] = useState(null);
  const commentCol = collection(db, "comments");
  const date = tweet.createdAt?.toDate();
  const time_ago = moment(date).fromNow();

  useEffect(() => {
    const found = tweet.likes.find((userId) => userId === auth.currentUser.uid);
    const foundRt = tweet.retweet.find(
      (userId) => userId === auth.currentUser.uid
    );
    setIsLiked(found);
    setIsRetweet(foundRt);
  }, [tweet]);

  const handleLike = () => {
    const ref = doc(db, "tweets", tweet.id);
    updateDoc(ref, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };
  const handleRetweet = async () => {
    const newRetweet = {
      textRetweet: `RT: ${auth.currentUser.displayName}`,
      retweetdAt: serverTimestamp(),
      retweetUser: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
    };
    const ref = doc(db, "tweets", tweet.id);
    const tweetDoc = await getDoc(ref);
    const isRetweeted = tweetDoc.data().retweet.includes(auth.currentUser.uid);

    if (!isRetweeted) {
      toast.success("Tweet retweeted!");
      await updateDoc(ref, {
        retweet: arrayUnion(auth.currentUser.uid),
      });
      setRetweetedPost(newRetweet);
    } else {
      toast.info("Tweet retweet retracted!");
      await updateDoc(ref, {
        retweet: arrayRemove(auth.currentUser.uid),
      });
      setRetweetedPost(null);
    }
  };
  const fetchComments = async (tweetId) => {
    const commentsQuery = query(
      collection(db, "comments"),
      where("tweetId", "==", tweetId)
    );

    const querySnapshot = await getDocs(commentsQuery);
    const comments = querySnapshot.docs.map((doc) => doc.data());
    return comments;
  };

  const handleComments = async (tweetId) => {
    console.log(tweetId);
    const fetchedComments = await fetchComments(tweetId);
    setCommentsData(fetchedComments);
    setShowCommentsData(!showCommentsData);
  };
  useEffect(() => {
    const queryOption = query(commentCol, where("tweetId", "==", tweet.id), orderBy("createdAt", "desc"));
    onSnapshot(queryOption, (snapshot) => {
      const tempComments = [];
      snapshot.forEach((doc) =>
        tempComments.push({ ...doc.data(), id: doc.id })
      );
      setCommentsData(tempComments);
    });
  }, [tweet.id]);

  return (
    <div className="flex flex-col gap-3 p-3 border-b-[0.5px] border-gray-800 overflow-x-hidden">
      <div className="flex w-full gap-3">
        <img className="w-14 h-14 rounded-full" src={tweet.user.photo} />
        <div className="w-full">
          <div className="flex  items-center gap-2 text-gray-600 text-sm ">
            {retweetedPost?.textRetweet && (
              <>
                <span>
                  <FaRetweet />{" "}
                </span>
                <span>You reposted</span>
              </>
            )}
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <p className="font-bold hidden md:block">{tweet.user.name}</p>
              <p className="text-gray-400">@{tweet.user.name.toLowerCase()}</p>
              <p className="text-gray-400">{time_ago}</p>
            </div>
            {tweet.user.id === auth.currentUser.uid && (
              <BsThreeDots
                onClick={() => setShowModal(true)}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
      <div className="my-3 mx-5 w-full">
        <p className="break-words text-justify px-5 me-5">
          {tweet.textContent}
        </p>
        {tweet.imageContent && (
          <div className="w-[300px] h-[200px]">
            <img
              className="rounded-lg mt-3 w-full h-full object-fill"
              src={tweet.imageContent}
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex  items-center p-2  rounded-full cursor-pointer transition">
          <BiMessageRounded
            onClick={() => setShowCommentModal(true)}
            className="text-3xl rounded-full hover:bg-emerald-600 hover:bg-opacity-40 p-1"
          />
          <span
            className="cursor-pointer ms-2"
            onClick={() => handleComments(tweet.id)}
          >
            {commentsData.length <= 0 ? (
              <RiQuillPenLine className="hover:text-emerald-600 text-xl" />
            ) : (
              commentsData.length
            )}{" "}
          </span>
        </div>
        <div
          onClick={handleRetweet}
          className="flex items-center gap-1 p-2  rounded-full cursor-pointer transition hover:text-lime-500"
        >
          {isRetweet ? (
            <FaRetweet className="text-3xl text-green-600 rounded-full hover:bg-lime-500 hover:bg-opacity-40 p-1" />
          ) : (
            <FaRetweet className="text-3xl rounded-full hover:bg-emerald-600 hover:bg-opacity-40 p-1" />
          )}

          <span>{tweet.retweet.length}</span>
        </div>
        <div
          onClick={handleLike}
          className="flex items-center gap-1 p-2  cursor-pointer transition hover:text-red-400"
        >
          {isLiked ? (
            <FcLike className="text-3xl rounded-full hover:bg-red-300 hover:bg-opacity-40 p-1" />
          ) : (
            <AiOutlineHeart className="text-3xl rounded-full hover:bg-red-300 hover:bg-opacity-40 p-1" />
          )}
          <span className="">{tweet.likes.length}</span>
        </div>
        <div className="p-2  rounded-full cursor-pointer transition">
          <CgLoadbarSound className="text-3xl rounded-full hover:bg-sky-400 hover:bg-opacity-40 p-1" />
        </div>
        <div className="p-2  rounded-full cursor-pointer transition ">
          <FiShare className="text-3xl rounded-full hover:bg-sky-400 hover:bg-opacity-40 p-1" />
        </div>
      </div>

      {showCommentsData && (
        <Comments
          comments={commentsData}
          modal={setShowCommentModal}
          tweet={tweet.id}
        />
      )}
      {showmodal && <Modal setShowModal={setShowModal} tweet={tweet} />}
      {showCommentModal && (
        <ModalComment show={setShowCommentModal} tweet={tweet} />
      )}
    </div>
  );
};

export default Post;
