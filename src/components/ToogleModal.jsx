import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { BiExit } from "react-icons/bi";
import { FaExchangeAlt } from "react-icons/fa";
const ToogleModal = () => {
  return (
    <>
      <div className="hidden md:block absolute place-items-end -bottom-10 w-60 -ms-2">
        <div className="rounded-2xl bg-zinc-900 p-2 mx-2 gap-3">
          <p className="w-full cursor-pointer font-bold p-2 rounded-md hover:bg-zinc-600">
            Add an existing account
          </p>
          <p
            className="hidden md:block w-full cursor-pointer font-bold p-2 rounded-md hover:bg-zinc-600 "
            onClick={() => signOut(auth)}
          >
            Log out
            <span className="font-thin ps-2">
              @{auth.currentUser?.displayName.toLocaleLowerCase()}
            </span>
          </p>
        </div>
      </div>
      <div className="md:hidden absolute place-items-end -bottom-5 ms-2 w-16 ">
        <div className="rounded-2xl bg-zinc-900 p-2 mx-2 gap-5 grid items-center justify-center ">
          <p className="text-xl w-full cursor-pointer hover:bg-zinc-600 px-2 rounded-lg">
            <FaExchangeAlt />
          </p>
          <p
            className="text-2xl w-full cursor-pointer hover:bg-zinc-600 px-2 rounded-lg"
            onClick={() => signOut(auth)}
          >
            <BiExit />
          </p>
        </div>
      </div>
    </>
  );
};

export default ToogleModal;
