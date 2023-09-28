import { navSections } from "./constants";
import { auth } from "../firebase/config";
import { RiTwitterXFill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import ToogleModal from "./ToogleModal";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <nav className="flex flex-col items-center xl:items-start xl:w-[340px] px-2 fixed h-full overflow-y-auto min-h-[100vh]">
      <div className="my-5 ">
        <div className="w-full bg-black justify-start ps-2 mb-2">
          <RiTwitterXFill className="text-4xl" />
        </div>
        {navSections.map((sec, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-3xl p-3 cursor-pointer rounded-full transition hover:bg-zinc-900"
          >
            {sec.icon}
            <span className="hidden md:block text-xl">{sec.title}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5">
        <button className="bg-blue-500 p-2 py-3 text-lg font-semibold rounded-3xl outline-none border-none hover:opacity-80 text-white hidden md:block">
          Post
        </button>
        <img
          src="/post.png"
          alt=""
          className=" md:hidden w-20 self-center cursor-pointer hover:opacity-75"
        />
        <div
          className="flex items-center justify-center gap-0 md:gap-2 p-1 md:p-3 rounded-full md:rounded-xl md:justify-between mb-8"
          onClick={handleToggleModal}
        >
          <img
            className="w-8 h-8 md:h-12 md:w-12  hover:opacity-75 rounded-full self-center  cursor-pointer hover:bg-zinc-800 "
            src={auth?.currentUser?.photoURL}
          />
          <div className="hidden md:block ">
            <p className="hidden md:block">{auth?.currentUser?.displayName}</p>
            <p className="hidden md:block font-thin text-xs text-gray-300 ">
              @{auth?.currentUser?.displayName.toLocaleLowerCase()}
            </p>
          </div>
          <p className="relative  cursor-pointer text-xl hidden md:block">
            <BsThreeDots />
          </p>
        </div>
        {isModalOpen && <ToogleModal setShow={setIsModalOpen} />}
      </div>
    </nav>
  );
};

export default Navbar;
