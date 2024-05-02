import React from "react";
import logoLight from "../assets/logo-light.png";
import paymentCards from "../assets/payments.png";
import { ImGithub } from "react-icons/im";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaHome,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BsPersonFill, BsPaypal } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="bg-black text-[#949494] py-20 font-titleFont">
      <div className="max-w-screen-lg mx-auto grid grid-cols-4">
        <div className="flex flex-col gap-7">
          <img src={logoLight} alt="logoLight" className="w-32" />
          <p className="text-white text-sm tracking-wide">© ReactDJ.com</p>
          <img src={paymentCards} alt="paymentCards" className="w-48" />
          <div className="flex gap-5 text-lg text-gray-400">
            <ImGithub className="hover:text-white duration-300 cursor-pointer" />
            <FaFacebookF className="hover:text-white duration-300 cursor-pointer" />
            <FaTwitter className="hover:text-white duration-300 cursor-pointer" />
            <FaInstagram className="hover:text-white duration-300 cursor-pointer" />
            <FaYoutube className="hover:text-white duration-300 cursor-pointer" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">locate us</h2>
          <div className="text-base flex flex-col gap-2">
            <p>Bancale, Daniel-Jhon</p>
            <p>Mobile: 091848 898185</p>
            <p>Phone: 0918 898185</p>
            <p>Email: bazar@gmail.com</p>
          </div>
        </div>

        {/* quick links start */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">
            quick links
          </h2>
          <div className="flex flex-col gap-2 text-base">
            <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
              <span>
                <BsPersonFill />
              </span>
              my account
            </p>
            <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
              <span>
                <BsPaypal />
              </span>
              check out
            </p>
            <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
              <span>
                <FaHome />
              </span>
              order tracking
            </p>
            <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
              <span>
                <MdLocationOn />
              </span>
              help & support
            </p>
          </div>
        </div>
        {/* quick links end */}

        <div className="flex flex-col justify-center">
          <input
            className="bg-transparent border px-4 py-2 text-sm"
            placeholder="Email"
            type="text"
            name=""
          />
          <button className="text-sm border text-white border-t-0 hover:bg-gray-900 active:bg-white active:text-black">
            Subscribe{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
