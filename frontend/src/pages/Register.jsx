import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { setCredentials } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../redux/api/usersApiSlice";

const Register = () => {
  const [firstname, setFirsname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    } else {
      try {
        const res = await register({
          firstname,
          lastname,
          email,
          password,
        }).unwrap();
        // Handle successful registration
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (error) {
        toast.error(error.data.message);
      }
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex gap-10">
        <div className="w-1/2 py-20">
          <img
            className="bg-cover"
            src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-125.jpg?size=626&ext=jpg&ga=GA1.1.605744752.1708401195&semt=ais"
            alt=""
          />
        </div>
        <div className="w-1/2 flex flex-col gap-5 py-20 items-center bg-gray-50">
          <div className="">
            <h1 className="text-md font-medium text-slate-500 mb-3">
              Create your Account
            </h1>
            <form
              onSubmit={handleRegister}
              className="flex flex-col gap-5 items-center w-full"
            >
              <input
                type="text"
                id="name"
                value={firstname}
                onChange={(e) => setFirsname(e.target.value)}
                placeholder="Firstname"
                className="border-[1px] w-80 h-12 px-3 rounded-md"
              />
              <input
                type="text"
                id="name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Lastname"
                className="border-[1px] w-80 h-12 px-3 rounded-md"
              />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border-[1px] w-80 h-12 px-3 rounded-md"
              />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="border-[1px] w-80 h-12 px-3 rounded-md"
              />
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="border-[1px] w-80 h-12 px-3 rounded-md"
              />
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button
                disabled={isLoading}
                type="submit"
                className="uppercase bg-black text-white w-80 py-2 rounded-md hover:bg-gray-800 duration-300 tracking-wide"
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>

              {isLoading && <Loader />}

              <p className="flex gap-2 items-center text-sm">
                Already have an account?
                <Link
                  to={redirect ? `/login?redirect=${redirect}` : "/login"}
                  className="hover:text-blue-600"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
