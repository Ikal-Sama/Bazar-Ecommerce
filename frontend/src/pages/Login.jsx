import React, { useState, useEffect } from "react";
import googleIcon from "../assets/google.png";
import githubIcon from "../assets/github.png";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/usersApiSlice";
import { setCredentials } from "../redux/features/auth/authSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials(res));
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  // google auth
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          setCredentials({
            _id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );
        setTimeout(() => {
          navigate("/");
        });
      })
      .catch((error) => {
        console.log(error);
      }, 1500);
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex gap-10">
        <div className="w-1/2 py-20">
          <img
            className="bg-cover"
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-2650.jpg?size=626&ext=jpg&ga=GA1.1.605744752.1708401195&semt=ais"
            alt=""
          />
        </div>
        <div className="w-1/2 flex flex-col gap-5 py-20 items-center bg-gray-50">
          <div className="">
            <h1 className="text-md font-medium text-slate-500 mb-3">
              Sign in with your Account
            </h1>
            <form
              onSubmit={submitHandler}
              className="flex flex-col gap-5 items-center w-full"
            >
              <input
                type="text"
                value={email}
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border-[1px] w-80 h-12 px-3 rounded-md"
              />
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="border-[1px] w-80 h-12 px-3 rounded-md"
              />
              <button
                disabled={isLoading}
                type="submit"
                className="uppercase bg-black text-white w-80 py-2 rounded-md hover:bg-gray-800 duration-300 tracking-wide"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>

              {isLoading && <Loader />}
              <p className="flex gap-2 items-center text-sm">
                Don't have an account yet?
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                  className="hover:text-blue-600"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
          <p className="text-base">Sign in with</p>
          <div className="w-full flex items-center justify-center gap-10">
            <div
              onClick={handleGoogleLogin}
              className="text-base w-80 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300"
            >
              <img className="w-8" src={googleIcon} alt="googleImg" />
              <span className="text-sm text-gray-900">Google</span>
            </div>
          </div>
          <div className="w-full flex items-center justify-center gap-10">
            <div className="text-base w-80 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300">
              <img className="w-8" src={githubIcon} alt="githubImg" />
              <span className="text-sm text-gray-900">Github</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
