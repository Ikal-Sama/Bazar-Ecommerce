import React from "react";
import LogoDark from "../assets/logo-dark.png";
import cartImg from "../assets/cartImg.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { removeUser } from "../redux/bazarSlice";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../redux/api/usersApiSlice";
import { logOut } from "../redux/features/auth/authSlice";

const Header = () => {
  // const productData = useSelector((state) => state.bazar.productData);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      signOut(auth);
      await logoutApiCall().unwrap();
      dispatch(logOut());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-20 bg-white  border-b-[1px] border-b-gray-800 font-titleFont sticky top-0 z-50">
      <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between px-24">
        <Link to="/">
          <div>
            <img src={LogoDark} alt="LogoDark" className="w-28" />
          </div>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Home
            </li>
            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Pages
            </li>
            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Shop
            </li>
            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Element
            </li>
            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Blog
            </li>
          </ul>
          <Link to="/cart">
            <div className="relative">
              <img src={cartImg} alt="cartImg" className="w-10" />
              <span className="absolute w-6 top-3 left-2 text-sm flex items-center justify-center font-semibold ">
                {/* {productData.length} */}
              </span>
            </div>
          </Link>

          {userInfo ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                {/* {userInfo ? (
                  <span className="text-base text-black">
                    {userInfo.username}
                  </span>
                ) : (
                  <></>
                )} */}
                <div className="w-10 rounded-full">
                  <img
                    src={
                      userInfo
                        ? userInfo.profilePhoto
                        : "https://cdn-icons-png.flaticon.com/128/236/236832.png"
                    }
                    alt="userLogo"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                {userInfo.isAdmin ? (
                  <>
                    <li>
                      <p className="justify-between">My Profile</p>
                    </li>
                    <li>
                      <Link to="/orders">
                        <p>My Orders</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/dashboard">
                        <p>Dashboard</p>
                      </Link>
                    </li>
                    <li
                      onClick={handleSignOut}
                      className="hover:text-red-500 duration-200"
                    >
                      <p>Logout</p>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/profile" className="justify-between">
                        <p>My Profile</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/orders">
                        <p>My Orders</p>
                      </Link>
                    </li>
                    <li
                      onClick={handleSignOut}
                      className="hover:text-red-500 duration-200"
                    >
                      <p>Logout</p>
                    </li>
                  </>
                )}
              </ul>
            </div>
          ) : (
            // <span className="text-base text-black">{userInfo.username}</span>
            <Link
              to="/login"
              className="bg-black text-white py-2 px-6 text-sm rounded-sm hover:bg-gray-800 duration-300 tracking-wide"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
