import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/bazarSlice";

const ProductsCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const _id = product.title;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const handleDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: product,
      },
    });
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: 1,
        description: product.description,
      })
    );
    toast.success(`Product is added to cart`);
  };
  return (
    <div className="group relative">
      <div
        onClick={handleDetails}
        className="w-full h-96 cursor-pointer overflow-hidden"
      >
        <img
          className="w-full h-full object-cover group-hover:scale-110 duration-500"
          src={product.image}
          alt="productImg"
        />
      </div>
      <div className="w-full border-[1px] px-2 py-4">
        <div className="flex flex-col justify-between">
          <h2 className="line-clamp-1 font-titleFont text-base font-bold">
            {product.title.substring(0, 15)}
          </h2>
          <div className="flex flex-col justify-end gap-2 relative overflow-hidden w-24 text-sm mt-3">
            <div className="flex flex-col gap-2 transform group-hover:translate-x-24">
              <p className="line-through text-gray-500">
                ${product.oldPrice}150.00
              </p>
              <p className="font-semibold">${product.price}</p>
            </div>
            <p
              onClick={handleAddToCart}
              className=" mt-3 absolute z-20 w-[100px] text-gray-500 hover:text-gray-900 flex items-center gap-1 top-0 transform -translate-x-32 group-hover:translate-x-0 transition-transform cursor-pointer duration-500"
            >
              Add to cart{" "}
              <span>
                <BsArrowRight />
              </span>
            </p>
          </div>
        </div>

        <div>
          <p>{product.category}</p>
        </div>
        <div className="absolute top-4 right-0">
          {product.isNew && (
            <p className="bg-black text-white font-semibold font-titleFont px-6 py-1">
              Sale
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
