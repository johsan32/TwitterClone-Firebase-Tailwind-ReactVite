import { toast } from "react-toastify";
import { auth, db, storage } from "./../firebase/config";
import { BsCardImage, BsEmojiSmile } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { PiGifFill } from "react-icons/pi";
import { FaList } from "react-icons/fa";
import { TbCalendarStats } from "react-icons/tb";
import { MdLocationPin } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { useState, useEffect } from "react";

const TweetForm = () => {
  const [textContent, setTextContent] = useState("");
  const tweetsCol = collection(db, "tweets");
  const uploadImage = async (image) => {
    console.log(image);
    if (!image) {
      return null;
    }
    const storageRef = ref(storage, `${new Date().getTime()}${image.name}`);
    const url = await uploadBytes(storageRef, image)
      .then((res) => getDownloadURL(res.ref))
      .catch(() => toast.error("An error occurred while loading the image"));
    return url;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target[3].files[0]);
    const textContent = e.target[1].value;
    const imageContent = e.target[3].files[0];

    if (textContent.length > 160) {
      toast.error("Tweet content is too long (maximum 160 characters).");
      return;
    }
    const url = await uploadImage(imageContent);

    if (!textContent) {
      toast.error("Add tweet content..");
      return;
    }
    await addDoc(tweetsCol, {
      textContent,
      imageContent: url,
      createdAt: serverTimestamp(),
      user: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      likes: [],
      comments: {
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName,
        userPhoto: auth.currentUser.photoURL,
        userText: "içerik",
        userImage: "url",
        userCreatedAt: serverTimestamp(),
      },
      retweet: [],
    });
    setTextContent("");
    e.target[1].value = "";
    e.target[3].value = null;
  };

  useEffect(() => {
    if (textContent.length < 50) {
      document.documentElement.style.setProperty("--bg-color", "#1DFF02");
    } else if (textContent.length < 100) {
      document.documentElement.style.setProperty("--bg-color", "#43b535");
    } else if (textContent.length < 140) {
      document.documentElement.style.setProperty("--bg-color", "#558c27");
    } else if (textContent.length < 160) {
      document.documentElement.style.setProperty("--bg-color", "#B5a605");
    } else {
      document.documentElement.style.setProperty("--bg-color", "#Ff0303");
    }
  }, [textContent]);
  return (
    <form
      onSubmit={handleSubmit}
      className="flex-col gap-3 p-4 border-b-2 border-b-gray-800"
    >
      <div className="flex items-start gap-3">
        <div>
          <img
            className="rounded-full h-[50px]"
            src={auth.currentUser?.photoURL}
          />
        </div>

        <div className="flex items-center border border-gray-600 rounded-lg px-2 gap-2  text-sky-600 cursor-pointer hover:bg-zinc-900">
          <button className="font-semibold">Everyone </button>
          <span>
            <IoIosArrowDown />
          </span>
        </div>
      </div>
      <div className="w-full">
        <textarea
          placeholder="What is happening?!"
          className="w-full bg-transparent outline-none placeholder:text-lg overflow-hidden px-5 mt-2"
          type="text"
          id="text"
          value={textContent}
          rows={2}
          style={{ resize: "vertical" }}
          onChange={(e) => setTextContent(e.target.value)}
        />

        <div className="flex items-center justify-between mb-1 px-2 gap-2 w-full text-sky-600 cursor-pointer rounded-lg hover:bg-zinc-900">
          <div className="flex items-center gap-2">
            <span>
              <BiWorld />
            </span>
            <button className="font-semibold flex py-2">
              Everyone can reply{" "}
            </button>
          </div>{" "}
          <div className="flex ">
            {textContent.length > 0 && (
              <p
                style={{ backgroundColor: "var(--bg-color, #00ff00)" }}
                className="text-end text-white flex justify-end items-end px-2 py-2  rounded-full"
              >
                {160 - textContent.length}
              </p>
            )}
          </div>
        </div>
        <div className="flex h-[45px] border-t border-gray-700 p-4  items-center justify-between">
          <label htmlFor="picture" className="flex gap-2 text-sky-600">
            <BsCardImage className=" hover:bg-gray-800 transition cursor-pointer p-2 text-4xl rounded-lg " />
            <PiGifFill className=" hover:bg-gray-800 transition cursor-pointer  p-2 text-4xl rounded-lg " />
            <FaList className=" hover:bg-gray-800 transition cursor-pointer  p-2 text-4xl rounded-lg " />
            <BsEmojiSmile className=" hover:bg-gray-800 transition cursor-pointer  p-2 text-4xl rounded-lg " />
            <TbCalendarStats className=" hover:bg-gray-800 transition cursor-pointer p-2 text-4xl  rounded-lg " />
            <MdLocationPin className=" hover:bg-gray-800 transition cursor-pointer  p-2 text-4xl rounded-lg " />
          </label>
          <input className="hidden" id="picture" type="file" />
          <button className="bg-sky-600 px-5 py-1 mt-2 rounded-full transition hover:bg-sky-500">
            Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default TweetForm;
