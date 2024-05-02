import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  deleteItem,
  incrementQuantity,
  resetCart,
} from "../redux/bazarSlice";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const CartItem = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.bazar.productData);

  if (productData.length === 0) {
    return (
      <div className="w-2/3 pr-10">
        <div className="flex flex-col justify-center items-center">
          <img
            className="w-56 "
            src="https://cdn-icons-png.flaticon.com/128/2038/2038854.png"
            alt=""
          />
          <p className="text-xl flex gap-2 mt-5">
            Your cart is empty. Please add an item
            <Link to="/">
              <button className=" flex items-center gap-1 text-gray-400 hover:text-black duration-300">
                <span>
                  <HiOutlineArrowLeft />
                </span>
                go shopping
              </button>
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-2/3 pr-10">
      <div className="w-full">
        <h2 className="font-titleFont text-2xl">Shopping Cart</h2>
      </div>
      <div>
        {productData.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between gap-6 mt-6"
          >
            <div className="flex items-center gap-2">
              <MdOutlineClose
                onClick={() =>
                  dispatch(deleteItem(item._id)) &
                  toast.error(`${item.title} is removed`)
                }
                fontSize="20"
                className="text-2xl text-gray-600 hover:text-red-600 cursor-pointer duration-300"
              />
              <img
                className="w-56 max-w-[100%] h-28 object-contain bg-transparent"
                src={item.image}
                alt="productImg"
              />
            </div>
            <h2 className="w-52">{item.title}</h2>
            <p className="w-10">{item.price}</p>
            <div className="w-52 flex items-center justify-between text-gray-500 gap-4 border p-3">
              <p className="text-sm">Quantity</p>
              <div className="flex items-center gap-4 text-sm font-semibold">
                <button
                  onClick={() =>
                    dispatch(
                      decrementQuantity({
                        _id: item._id,
                        title: item.title,
                        image: item.image,
                        price: item.price,
                        quantity: 1,
                        description: item.description,
                      })
                    )
                  }
                  className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    dispatch(
                      incrementQuantity({
                        _id: item._id,
                        title: item.title,
                        image: item.image,
                        price: item.price,
                        quantity: 1,
                        description: item.description,
                      })
                    )
                  }
                  className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                >
                  +
                </button>
              </div>
            </div>
            <p className="w-14">{item.quantity * item.price}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          dispatch(resetCart()) & toast.error("Your Cart is Empty!")
        }
        className="bg-red-500 text-white mt-8 ml-7 py-1 px-6 hover:bg-red-800"
      >
        Reset Cart
      </button>
      <Link to="/">
        <button className="mt-8 ml-7 flex items-center gap-1 text-gray-400 hover:text-black duration-300">
          <span>
            <HiOutlineArrowLeft />
          </span>
          go shopping
        </button>
      </Link>
    </div>
  );
};

export default CartItem;
