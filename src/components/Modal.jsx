import { BsCardImage, BsEmojiSmile } from "react-icons/bs";
import { PiGifFill } from "react-icons/pi";
import { FaList } from "react-icons/fa";
import { TbCalendarStats } from "react-icons/tb";
import { MdLocationPin } from "react-icons/md";
import { collection, serverTimestamp } from "firebase/firestore";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "./../firebase/config";
import { toast } from "react-toastify";
import { v4 } from "uuid";
const Modal = ({ setShowModal, tweet }) => {
  const tweetsCol = collection(db, "tweets");

  const uploadImage = async (image) => {
    if (!image) {
      return null;
    }
    console.log("img", image);
    const storageRef = ref(storage, `${v4()}-${image.name}`);
    const url = await uploadBytes(storageRef, image)
      .then((res) => getDownloadURL(res.ref))
      .catch(() => toast.error("An error occurred while uploading the image"));
    return url;
  };

  const handleFileChange = async (e) => {
    console.log("çalıştı", e.target);
    console.log("çalışma", e.target.files);
    const imageChange = e.target.files[0];
    console.log("chh", imageChange);

    if (!imageChange) {
      console.log("Dosya seçilmedi.");
      return;
    }

    const url = await uploadImage(imageChange);
    const ref = doc(db, "tweets", tweet.id);
    await updateDoc(ref, {
      imageContent: url,
    });
    e.target.value = null;
    console.log(e.target.value);
  };

  const handleChange = async (e) => {
    e.preventDefault();
    console.log(e.target);
    const textChange = e.target.value;
    const ref = doc(db, "tweets", tweet.id);
    await updateDoc(ref, {
      textContent: textChange,
      updateAt: serverTimestamp(),
    });

  };

  const handleDelete = () => {
    const ref = doc(db, "tweets", tweet.id);
    deleteDoc(ref)
      .then(() => toast.error("Tweet deleted.."))
      .catch((err) => toast.error("Tweet silinirken bir hata oluştu.."));
    setShowModal(false);
  };
  return (
    <>
      <div className="grid place-items-center overflow-x-hidden overflow-y-auto w-full fixed inset-0 z-50">
        <div className="relative mx-auto max-w-2xl w-[80%] my-5 ">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-zinc-900  outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 rounded-t">
              <div className="flex items-center gap-3">
                <img
                  className="w-14 h-14 rounded-full"
                  src={tweet.user.photo}
                />
                <p className="font-bold hidden md:block">{tweet.user.name}</p>
                <p className="text-gray-400">
                  @{tweet.user.name.toLowerCase()}
                </p>
              </div>
              <button
                className="p-1 ml-auto  border-none rounded-lg text-white float-right px-1  flex items-start text-3xl leading-none font-semibold outline-none bg-red-600 hover:opacity-50"
                onClick={() => setShowModal(false)}
              >
                X
              </button>
            </div>
            <form className="relative p-6 flex-auto border-t border-gray-700">
              <div className="my-3">
                <input
                  onChange={handleChange}
                  className="w-full bg-transparent my-2 outline-none placeholder:text-lg"
                  type="text"
                  id="text"
                  value={tweet.textContent}
                />
                <p>{""}</p>
                {tweet.imageContent && (
                  <img
                    className="rounded-lg mt-3 cursor-pointer w-52"
                    src={tweet.imageContent}
                  />
                )}
              </div>
            </form>
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
                type="file"
                id="picture"
                onChange={handleFileChange}
                className="absolute transparent z-1 text-transparent opacity-0"
              />
            </div>
            <div className="flex items-center justify-end rounded-b mb-3 pe-3 gap-3">
              <button
                className="text-white bg-red-500 font-bold hover:bg-red-700 rounded-lg px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleDelete}
              >
                Delete Tweet
              </button>
              <button
                className="text-white bg-yellow-500 font-bold hover:bg-yellow-700 rounded-lg text-sm px-6 py-2 shadow hover:shadow-lg  mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
