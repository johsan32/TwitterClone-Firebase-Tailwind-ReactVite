import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db, storage } from "../firebase/config";
import { useState } from "react";
import { BsCardImage, BsEmojiSmile } from "react-icons/bs";
import { PiGifFill } from "react-icons/pi";
import { FaList } from "react-icons/fa";
import { TbCalendarStats } from "react-icons/tb";
import { MdLocationPin } from "react-icons/md";
import { v4 } from "uuid";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { toast } from "react-toastify";
import moment from "moment";
import "moment/locale/tr";

const ModalComment = ({ show, tweet }) => {
  const commentsCol = collection(db, "comments");
  const tweetsCol = collection(db, "tweets");
  const date = tweet.createdAt?.toDate();
  const time_ago = moment(date).fromNow();
  console.log(tweetsCol);
  const uploadImage = async (image) => {
    if (!image) {
      return null;
    }
    console.log("img", image);
    const storageRef = ref(storage, `${v4()}-${image.name}`);
    const url = await uploadBytes(storageRef, image)
      .then((res) => getDownloadURL(res.ref))
      .catch(() => toast.error("Resmi yüklerken hata oluştu"));
    return url;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];
    const url = await uploadImage(imageContent);

    if (!textContent) {
      toast.error("Add tweet content..");
      return;
    }

    await addDoc(commentsCol, {
      tweetId: tweet.id,
      textContent,
      imageContent: url,
      createdAt: serverTimestamp(),
      user: {
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName,
        userPhoto: auth.currentUser.photoURL,
      },
      likes: [],
    });
    e.target[0].value = "";
    e.target[1].files = null;
    show(false);
  };

  return (
    <>
      <div className="grid place-items-center overflow-x-hidden overflow-y-auto w-full fixed inset-0 z-50">
        <div className="relative mx-auto max-w-2xl w-[70%] my-5 ">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black  outline-none focus:outline-none">
            <div className="flex flex-col items-start justify-between p-5 rounded-t">
              <div className="flex justify-start">
                <button
                  className="mb-3 ml-auto  border border-gray-700 rounded-lg text-white float-right px-1  flex items-start text-xl leading-none font-semibold outline-none  hover:opacity-50"
                  onClick={() => show(false)}
                >
                  X
                </button>
              </div>
              <div className="mt-4 flex w-full gap-3 px-4 justify-between items-center">
                <div>
                  <img
                    className="w-14 h-14 rounded-full"
                    src={tweet.user.photo}
                  />
                </div>
                <div className="w-full flex-col justify-between items-center">
                  <div className="flex items-center gap-3">
                    <p className="font-bold hidden md:block">
                      {tweet.user.name}
                    </p>
                    <p className="text-gray-400">
                      @{tweet.user.name.toLowerCase()}
                    </p>
                    <p className="text-gray-400">{time_ago}</p>
                  </div>
                  <p className="text-white">{tweet.textContent.slice(0, 80)}</p>
                </div>
              </div>
              <div className="ms-16 mt-3">
                <p className="text-gray-400">
                  Replying to{" "}
                  <span className="text-sky-500">
                    @{tweet.user.name.toLowerCase()}
                  </span>
                </p>
              </div>
              <div className="my-3 mx-5 w-full"></div>
            </div>
            <div className="flex-col flex items-center"></div>
            <form
              onSubmit={handleSubmit}
              className="relative px-6 ms-5 flex-auto flex-col "
            >
              <div className="flex gap-4 items-center">
                <img
                  className="rounded-full h-[40px]"
                  src={auth.currentUser?.photoURL}
                />
                <div className="my-3">
                  <input
                    className="w-full bg-transparent my-2 outline-none placeholder:text-lg"
                    type="text"
                    id="text"
                    placeholder="Post your reply..."
                  />
                </div>
              </div>

              <div className="relative flex h-[45px] border-t border-gray-700 p-4  items-center justify-between cursor-pointer">
                <label htmlFor="picture" className="flex gap-2 text-sky-600">
                  <BsCardImage className=" hover:bg-gray-800 transition cursor-pointer p-2 text-4xl rounded-lg " />
                  <PiGifFill className=" hover:bg-gray-800 transition cursor-pointer  p-2 text-4xl rounded-lg " />
                  <FaList className=" hover:bg-gray-800 transition cursor-pointer  p-2 text-4xl rounded-lg " />
                  <BsEmojiSmile className=" hover:bg-gray-800 transition cursor-pointer  p-2 text-4xl rounded-lg " />
                  <TbCalendarStats className=" hover:bg-gray-800 transition cursor-pointer p-2 text-4xl  rounded-lg " />
                  <MdLocationPin className=" hover:bg-gray-800 transition cursor-pointer  p-2 text-4xl rounded-lg " />
                </label>
                <input
                  id="picture"
                  type="file"
                  name="imageContent"
                  className="absolute transparent z-1 text-transparent opacity-0"
                />
              </div>
              <div className="flex items-center justify-end rounded-b mb-3 pe-3 gap-3">
                <button
                  className="text-white bg-sky-500 font-bold hover:bg-sky-700 rounded-lg text-sm px-6 py-2 shadow hover:shadow-lg  mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-[#242729]"></div>
    </>
  );
};

export default ModalComment;
