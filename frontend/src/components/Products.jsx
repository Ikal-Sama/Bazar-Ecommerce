import React from "react";
import ProductsCard from "./ProductsCard";

const Products = ({ products }) => {
  return (
    <div className="py-10">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl bg-slate-900 text-white w-80 text-center p-2">
          Shopping Everyday
        </h1>
        <span className="w-20 h-[3px] bg-black"></span>
        <p className="max-w-[700px] text-gray-600 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
          numquam ex. Asperiores, laudantium dolore fugit cupiditate earum
          beatae repudiandae cum, iure deserunt blanditiis ex totam ut
          recusandae sunt rerum, obcaecati ipsa.
        </p>
      </div>
      <div className="max-w-screen-lg mx-auto py-10 grid grid-cols-4 gap-10">
        {products.map((item) => (
          <ProductsCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
