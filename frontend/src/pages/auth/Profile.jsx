import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiPencil } from "react-icons/hi";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [firstname, setFirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(
    userInfo.profilePhoto ||
      "https://cdn-icons-png.flaticon.com/128/236/236832.png"
  );
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setFirstName(userInfo.firstname);
    setlastName(userInfo.lastname);
    setGender(userInfo.gender);
    setAddress(userInfo.address);
    setMobile(userInfo.mobile);
    setProfilePhoto(userInfo.profilePhoto);
    setEmail(userInfo.email);
  }, [
    userInfo.lastname,
    userInfo.firstname,
    userInfo.gender,
    userInfo.address,
    userInfo.mobile,
    userInfo.profilePhoto,
    userInfo.email,
  ]);

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          firstname,
          lastname,
          address,
          gender,
          mobile,
          email,
          profilePhoto,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        document.getElementById("my_modal_5").close();
        toast.success("Profile updated");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto py-20">
      <div>
        <div className="flex justify-evenly border py-3 items-start">
          <img
            className="max-w-56 max-h-56 h-56 w-56 p-2 hover:shadow-sm transition-all duration-300 bg-contain rounded-full"
            src={
              userInfo
                ? userInfo.profilePhoto
                : "https://cdn-icons-png.flaticon.com/128/236/236832.png"
            }
            alt=""
          />
          <div className="mt-3">
            <div className="flex gap-2">
              <h1 className="text-2xl text-slate-600">{userInfo.firstname}</h1>
              <h1 className="text-2xl text-slate-600">{userInfo.lastname}</h1>
            </div>
            <h1 className="text-md mt-1 text-slate-600">{userInfo.email}</h1>
            <h1 className="text-md mt-1 text-slate-600">
              +63 {userInfo.mobile}
            </h1>
            <h1 className="text-md mt-1 text-slate-600">{userInfo.address}</h1>
            <p className="mt-3">Bio</p>
          </div>
          <div>
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="btn bg-sky-500 text-white flex items-center gap-2 mt-3 py-2 px-5 rounded-md hover:bg-blue-500 duration-300"
            >
              Edit Profile <HiPencil />
            </button>
          </div>
        </div>
        <div className=" border-t border-gray-300 bg-slate-50 py-5">
          <div className="flex items-center justify-evenly mt-5">
            <div className="flex flex-col items-center">
              <p className="text-2xl font-semibold text-slate-600">123</p>
              <span className="text-sm mt-3">Orders</span>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl font-semibold text-slate-600">123</p>
              <span className="text-sm mt-3">Cart</span>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl font-semibold text-slate-600">123</p>
              <span className="text-sm mt-3">Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Update */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="bg-white h-[30rem] max-w-screen-lg w-[40rem] rounded-md  overflow-y-scroll shadow-md">
          <div className="py-4 px-8 ">
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold">Update Profile </h1>
              <button
                className="absolute right-[22rem] p-1 hover:text-white hover:bg-gray-400 rounded-full"
                onClick={() => document.getElementById("my_modal_5").close()}
              >
                <IoIosCloseCircleOutline fontSize={20} />
              </button>
            </div>
            <form onSubmit={submitHandler} className="">
              <div className="border-b py-3 mb-3 mt-5 text-slate-600 font-medium">
                Profile Photo
              </div>
              <div className="mt-3 flex justify-center gap-10">
                <div className="w-full">
                  <div className="label">
                    <span className="label-text">Profile</span>
                  </div>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file && file.size <= 5000 * 1024) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setProfilePhoto(reader.result);
                        };
                        reader.readAsDataURL(file);
                      } else {
                        toast.error("File size should be less than 5MB");
                      }
                    }}
                    className="file-input file-input-bordered w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="border-b py-3 mb-3 mt-5 text-slate-600 font-medium">
                Personal Info
              </div>
              <div className="flex justify-center gap-10">
                <div className="w-full">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Type here"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="w-full">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastname}
                    onChange={(e) => setlastName(e.target.value)}
                    placeholder="Type here"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="mt-3 flex justify-center gap-10">
                <div className="w-full">
                  <div className="label">
                    <span className="label-text">Address</span>
                  </div>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Type here"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="w-full">
                  <div className="label">
                    <span className="label-text">Mobile #</span>
                  </div>
                  <input
                    type="number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Type here"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="mt-3 flex justify-center gap-10">
                <div className="w-full">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="select select-bordered w-full"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="w-full">
                  <div className="label">
                    <span className="label-text">Email</span>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Type here"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="mt-3 flex justify-center gap-10">
                <div className="w-full">
                  <div className="label">
                    <span className="label-text">New Password</span>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="Type here"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="w-full">
                  <div className="label">
                    <span className="label-text">Confirm New Password</span>
                  </div>
                  <input
                    type="password"
                    placeholder="Type here"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn mt-3 px-10 bg-sky-500 text-white hover:bg-blue-500"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {loadingUpdateProfile && <Loader />}
    </div>
  );
};

export default Profile;
