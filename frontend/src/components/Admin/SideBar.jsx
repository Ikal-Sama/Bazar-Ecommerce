import { useState } from "react";
import LogoLight from "../../assets/logo-light.png";
import { Link } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import "./Sidebar.css";

const SideBar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);

  const toggleProductsDropdown = () => {
    setIsProductsOpen(!isProductsOpen);
    setIsUsersOpen(false);
  };

  const toggleUsersDropdown = () => {
    setIsUsersOpen(!isUsersOpen);
    setIsProductsOpen(false);
  };
  return (
    <div className="h-screen text-slate-200 w-48 bg-slate-700">
      <div className=" py-4">
        <div className="flex justify-center">
          <Link to="/admin/dashboard">
            <img src={LogoLight} alt="logo" className="w-28 " />
          </Link>
        </div>
        <div className="mr-12 ml-5 mt-14 mb-3 bg-slate-600 rounded-md">
          <p className="px-3 uppercase font-bold text-xs font-nunito py-1 tracking-wide">
            General
          </p>
        </div>
        <div className="font-nunito font-semibold ">
          <ul className=" flex flex-col gap-3 ">
            <li className="text-sm tracking-wide flex items-center gap-3 hover:bg-slate-600 w-full px-5 py-2 active:bg-slate-600">
              <CiHome fontSize={20} />
              <Link>Dashboard</Link>
            </li>
          </ul>
        </div>

        <div className="mr-12 ml-5 mt-8 mb-3 bg-slate-600 rounded-md">
          <p className="px-3 uppercase font-bold text-xs font-nunito py-1 tracking-wide">
            Applications
          </p>
        </div>
        <div className="font-nunito font-semibold">
          <ul className="flex flex-col">
            <li>
              <div className={isProductsOpen ? "dropdown-open" : ""}>
                <div
                  className="text-sm cursor-pointer tracking-wide flex items-center gap-3 hover:bg-slate-600 w-full px-5 py-2 active:bg-slate-600 transition-all ease-in-out duration-500"
                  onClick={toggleProductsDropdown}
                >
                  <CiHome fontSize={20} />
                  <Link>Products</Link>
                </div>
                <ul
                  className={`dropdown-content transform origin-top transition-transform duration-300 ease-in-out scale-y-0 ${
                    isProductsOpen ? "scale-y-100" : ""
                  } px-7 text-sm py-2 rounded-t-none`}
                >
                  <li className="text-sm cursor-pointer tracking-wide flex items-center gap-3 hover:bg-slate-600 w-full px-5 py-2 active:bg-slate-600">
                    <a>Link 1</a>
                  </li>
                  <li className="text-sm cursor-pointer tracking-wide flex items-center gap-3 hover:bg-slate-600 w-full px-5 py-2 active:bg-slate-600">
                    <a>Link 1</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div className={isUsersOpen ? "dropdown-open" : ""}>
                <div
                  className="text-sm  cursor-pointer tracking-wide flex items-center gap-3 hover:bg-slate-600 w-full px-5 py-2 active:bg-slate-600 transition-all ease-in-out duration-500"
                  onClick={toggleUsersDropdown}
                >
                  <CiHome fontSize={20} />
                  <Link>Users</Link>
                </div>
                <ul
                  className={` dropdown-content transform origin-top transition-transform duration-300  ease-in-out scale-y-0 ${
                    isUsersOpen ? "scale-y-100" : ""
                  } px-7 text-sm py-2 rounded-t-none`}
                >
                  <li className="text-sm cursor-pointer tracking-wide flex items-center gap-3 hover:bg-slate-600 w-full px-5 py-2 active:bg-slate-600">
                    <a>Link 1</a>
                  </li>
                  <li className="text-sm cursor-pointer tracking-wide flex items-center gap-3 hover:bg-slate-600 w-full px-5 py-2 active:bg-slate-600">
                    <a>Link 1</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
