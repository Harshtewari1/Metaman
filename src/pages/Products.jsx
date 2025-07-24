"use client";
import React from "react";
import { useGlobal } from "../context/GlobalContext";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const { products } = useGlobal();

  return (
    <div className="w-full">
      {/* Product 1: Full Width */}
      {products[0] && (
        <ProductCard
          key={products[0].id}
          product={products[0]}
          isReversed={false}
          bgColor="bg-[#5A3E36]" // Brown
        />
      )}

      {/* Products 2 & 3: Same Row */}
      <div className="flex flex-col md:flex-row w-full">
        {products[1] && (
          <div className="w-full md:w-1/2 bg-blue-800">
            <ProductCard
              key={products[1].id}
              product={products[1]}
              isReversed={false}
              bgColor="bg-blue-800"
            />
          </div>
        )}
        {products[2] && (
          <div className="w-full md:w-1/2 bg-[#424242]">
            <ProductCard
              key={products[2].id}
              product={products[2]}
              isReversed={true}
              bgColor="bg-[#424242]" // Gray
            />
          </div>
        )}
      </div>

      {/* Products 4 & 5: Same Row */}
      <div className="flex flex-col md:flex-row w-full items-stretch">
        {products[3] && (
          <div className="w-full md:w-1/2 bg-green-800">
            <ProductCard
              key={products[3].id}
              product={products[3]}
              isReversed={false}
              bgColor="bg-green-800"
            />
          </div>
        )}
        {products[4] && (
          <div className="w-full md:w-1/2 bg-red-800">
            <ProductCard
              key={products[4].id}
              product={products[4]}
              isReversed={true}
              bgColor="bg-red-800"
            />
          </div>
        )}
      </div>

      {/* Product 6: Full Width, New Row */}
      {products[5] && (
        <ProductCard
          key={products[5].id}
          product={products[5]}
          isReversed={false}
          bgColor="bg-violet-400" // Deep violet for new product
        />
      )}
    </div>
  );
};

export default Products;
