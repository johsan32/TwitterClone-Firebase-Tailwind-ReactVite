import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth, githubAuthProvider, googleAuthProvider } from "../firebase/config";
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [signup, setSignup] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      navigate('/feed');
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const mail = e.target[0].value;
    setEmail(mail);
    const pass = e.target[1].value;

    if (signup) {
      createUserWithEmailAndPassword(auth, mail, pass)
        .then(() => {
          navigate("/feeds");
          toast.success("Your account has been created");
        })
        .catch((err) => {
          toast.error(`Sorry, an error occurred: ${err.code}`);
        });
    } else {
      signInWithEmailAndPassword(auth, mail, pass)
        .then(() => {
          navigate("/feeds");
          toast.success("Your account is logged in");
        })
        .catch((err) => {
          if (err.code === "auth/invalid-login-credentials") {
            setIsError(true);
          }
          toast.error(`Sorry, an error occurred${err.code}`);
        });
    }
  };
  const handlePassReset = () => {
    sendPasswordResetEmail(auth, email).then(() =>
      toast.info("A reset e-mail has been sent to your e-mail address.")
    );
  };
  const handleGoogle = () => {
    signInWithPopup(auth, googleAuthProvider).then(() => {
      toast.success("Signed in with your Google account");
      navigate("/feeds");
    });
  };
  const handleGithub = () => {
    signInWithPopup(auth, githubAuthProvider).then(() => {
      toast.success("Signed in with your Github account");
      navigate("/feeds");
    });
  };

  return (
    <section className=" h-screen flex justify-between bg-black  " >
      <div className="h-screen w-[800px] hidden md:block">
        <img src="/head.gif" alt="" className="h-screen" />
      </div>
      <div className="grid place-items-center overflow-hidden rounded-3xl bg-black w-[500px] h-screen ">
        <div className="grid place-items-center w-full">
          <img src="/logo2.png" className="w-24 h-20" />
          <h1 className="text-center mt-0 text-gray-600">Happening Now!</h1>
        </div>
        <div className="flex justify-center items-center flex-col rounded-t-3xl  shadow">
          <form
            onSubmit={handleSubmit}
            className="mt-2 space-y-8 px-5  text-center"
          >
            <div className="group relative w-[320px] ">
              <input
                type="text"
                required
                className="peer h-8 w-full rounded-3xl bg-gray-100 px-4 text-sm outline-none"
              />
              <label
                
                className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-white peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
              >
                Username
              </label>
            </div>
            <div className="group relative w-[320px] ">
              <input
                type="password"
                required
                className="peer h-8 w-full rounded-3xl bg-gray-100 px-4 text-sm outline-none"
              />
              <label
                
                className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-white peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
              >
                Password
              </label>
            </div>

            <button className="h-12 w-full rounded-3xl outline-none border-gray-500 bg-zinc-900 text-white transition-all duration-300 hover:bg-zinc-700">
              Login
            </button>
          </form>
          {isError && !signup && (
            <a
              href="#"
              className="flex self-end px-12 mt-2 font-xs font-thin text-gray-400"
              onClick={handlePassReset}
            >
              Forgot password?
            </a>
          )}

          <p className="gap-2 text-center text-white pt-5">
            {signup ? " Do you have an account. " : " Don't have an account? "}
            <a
              href="#"
              className="font-semibold text-blue-900 hover:text-blue-800 "
              onClick={() => setSignup(!signup)}
            >
              {signup ? " Login" : " Sign Up"}
            </a>
          </p>

          <a
            href="#"
            onClick={handleGoogle}
            className="bg-white border-white-500 group m-auto mb-4 mt-5 inline-flex h-12 w-[320px] items-center justify-center space-x-2 rounded-3xl border px-4 py-2 transition-colors duration-300 hover:border-gray-500 hover:bg-zinc-700 focus:outline-none"
          >
            <img src="/google.png" className="w-8" />
            <span className="text-md font-medium text-black">
              {signup ? "Contiune" : "Sign Up"} with Google
            </span>
          </a>

          <a
            href="#"
            onClick={handleGithub}
            className="border-white-500 group mb-4 my-0 inline-flex h-12 w-[320px] items-center justify-center space-x-2 rounded-3xl border px-4 py-2 transition-colors duration-300 hover:border-gray-500 hover:bg-zinc-700 focus:outline-none"
          >
            <span>
              <svg
                className="h-8 w-8 fill-current text-white"
                viewBox="0 0 16 16"
                version="1.1"
                aria-hidden="true"
              >
                <path
                  fill-rule="text-white"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                ></path>
              </svg>
            </span>
            <span className="text-md font-medium text-white">
              {signup ? "Contiune" : "Sign Up"} with Github
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
