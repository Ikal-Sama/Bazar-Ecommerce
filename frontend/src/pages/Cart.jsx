import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { ToastContainer, toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const Cart = () => {
  const productData = useSelector((state) => state.bazar.productData);
  const [totalAmt, setTotalAmt] = useState("");
  const userInfo = useSelector((state) => state.bazar.userInfo);
  const [payNow, setPayNow] = useState(false);

  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price.toFixed(2));
  }, [productData]);

  const handleCheckout = () => {
    if (userInfo) {
      setPayNow(true);
    } else {
      toast.error("Please Sign in to Checkout");
    }
  };

  const payment = async (token) => {
    await axios.post("http://localhost:8000/pay", {
      amount: totalAmt * 100,
      token: token,
    });
  };

  return (
    <div>
      <img
        className="w-full h-60 object-cover object-top"
        src="https://img.freepik.com/free-vector/banner-with-handrawn-elements-sale_125540-187.jpg?w=1060&t=st=1708343720~exp=1708344320~hmac=03b512a305c77fb095ea6ece117f7d98325741612917da12911b28aba6c8a20b"
        alt="cartImg"
      />
      <div className="max-w-screen-lg mx-auto py-20 flex">
        <CartItem />
        <div className="w-1/3 bg-[#fafafa] py-6 px-4">
          <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
            <h2 className="text-2xl font-medium">Cart Totals</h2>
            <p className="flex items-center gap-4 text-base">
              Subtotal
              <span className="font-titleFont font-bold text-lg">
                $ {totalAmt}
              </span>
            </p>
            <p className="flex items-start gap-4 text-base">
              Shipping
              <span className="">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Repudiandae, magni.
              </span>
            </p>
          </div>
          <p className="font-titleFont font-semibold flex justify-between mt-6">
            Total
            <span className="text-xl font-bold">$ {totalAmt}</span>
          </p>
          <button
            onClick={handleCheckout}
            className="text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 duration-300"
          >
            Proceed to checkout
          </button>
          {payNow && (
            <div className="w-full mt-6 flex items-center justify-center">
              <StripeCheckout
                stripeKey="pk_test_51OWVlQFtJWvhz4kdm8uEJCDLMIAwGI2CiKDa5mSqC0FmKXN6vbzO6Z4HcDz9xACgd7yB8N1qpHdJQ31hPL5bDyUl00jMrLIvFf"
                name="Bazar Ecommerce"
                amount={totalAmt * 100}
                label="Pay to Bazar"
                description={`Your Payment amount is $${totalAmt}`}
                token={payment}
                email={userInfo.email}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
