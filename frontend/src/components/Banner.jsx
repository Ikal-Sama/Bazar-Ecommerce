import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  const customArrowStyles = {
    // Define your custom arrow styles here
    position: "absolute",
    zIndex: 2,
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "3rem",
    color: "#4C4C4C",
    padding: "10px",
    transition: "background-color 0.3s ease",
  };
  return (
    <div className="w-full h-auto ">
      <div className="">
        <Carousel
          showArrows={true}
          showThumbs={false}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{ ...customArrowStyles, left: "20px" }}
              >
                &lt;
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{ ...customArrowStyles, right: "20px" }}
              >
                &gt;
              </button>
            )
          }
        >
          <div
            className="flex items-center object-cover h-screen px-24"
            style={{
              backgroundImage:
                "url('https://demo-kalles-4-3.myshopify.com/cdn/shop/files/slider2.jpg?v=1660730335')",
              backgroundPosition: "top",
            }}
          >
            <div className="flex flex-col text-left">
              <h1 className="text-lg">Hot Deal</h1>
              <h1 className="text-4xl font-medium mt-5">Bohemia Collection</h1>
              <button className="bg-black text-white w-44 p-3 rounded-full mt-5 hover:bg-opacity-80  duration-500 ease-in">
                Shop Now
              </button>
            </div>
          </div>
          <div
            className="flex items-center object-cover h-screen px-24"
            style={{
              backgroundImage:
                "url('https://demo-kalles-4-3.myshopify.com/cdn/shop/files/slider3.jpg?v=1660730335&width=2000')",
              backgroundPosition: "top",
            }}
          >
            <div className="flex flex-col text-left">
              <h1 className="text-lg">New Arrivals</h1>
              <h1 className="text-4xl font-medium mt-5">
                Active Wear Collection
              </h1>
              <button className="bg-black text-white w-44 p-3 rounded-full mt-5 hover:bg-opacity-80  duration-500 ease-in">
                Shop Now
              </button>
            </div>
          </div>
          <div
            className="flex items-center object-cover h-screen px-24"
            style={{
              backgroundImage:
                "url('https://demo-kalles-4-3.myshopify.com/cdn/shop/files/slider1.jpg?v=1660730335&width=1800')",
              backgroundPosition: "top",
            }}
          >
            <div className="flex flex-col text-left">
              <h1 className="text-lg">Hot Deal</h1>
              <h1 className="text-4xl font-medium mt-5">
                Spring Collection 2024
              </h1>
              <button className="bg-black text-white w-44 p-3 rounded-full mt-5 hover:bg-opacity-80  duration-500 ease-in">
                Shop Now
              </button>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
