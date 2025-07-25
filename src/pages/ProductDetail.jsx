import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext.jsx";

const ProductDetail = () => {
  const { products } = useGlobal();
  const { id } = useParams();

  const product = products.find((item) => String(item.id) === String(id));

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-2xl">Product not found.</p>
      </div>
    );

  const images = product.images || [product.image];
  const [currentImg, setCurrentImg] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrentImg((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearTimeout(timeoutRef.current);
  }, [currentImg, images]);

  const goTo = (idx) => setCurrentImg(idx);
  const goNext = () => setCurrentImg((i) => (i + 1) % images.length);
  const goPrev = () => setCurrentImg((i) => (i - 1 + images.length) % images.length);

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + (product.deliveryDays || 3));
  const deliveryDateString = deliveryDate.toDateString();

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 pt-24 md:pt-28">
      <div className="max-w-6xl mx-auto mt-8"
      >
        <Link
          to="/products"
          className="text-black bg-white rounded-full px-5 py-2 transition duration-150 ease-in-out shadow-sm hover:underline hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer text-sm mb-4  inline-block "
        >
          &larr; Back to Products
        </Link>


        <div className="flex flex-col md:flex-row gap-10">
        
          <div className="relative w-full md:w-1/2 h-[300px] sm:h-[350px] md:h-[400px] flex items-center justify-center">
            <img
              src={images[currentImg]}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl shadow-lg transition duration-500"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/25 hover:bg-blue-500/80 text-white rounded-full p-2 z-10"
                  aria-label="Previous Image"
                >
                  &#8592;
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/25 hover:bg-blue-500/80 text-white rounded-full p-2 z-10"
                  aria-label="Next Image"
                >
                  &#8594;
                </button>

                <div className="absolute bottom-3 w-full flex justify-center gap-2">
                  {images.map((_img, idx) => (
                    <button
                      key={idx}
                      onClick={() => goTo(idx)}
                      aria-label={`Show image ${idx + 1}`}
                      className={`w-3 h-3 rounded-full border border-white transition ${idx === currentImg
                        ? "bg-blue-400"
                        : "bg-white/20 hover:bg-blue-600/80"
                        }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">{product.name}</h1>
            <p className="text-gray-400 mb-4 text-sm sm:text-base">{product.description}</p>
            <div className="mb-4 text-base sm:text-lg">
              <span className="font-semibold">Price:</span> ₹{product.price}
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-4">
                <span className="font-semibold">Available Sizes:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-1 border rounded-full ${selectedSize === size
                        ? "bg-white text-black"
                        : "border-white text-white"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-4">
              <span className="font-semibold">Estimated Delivery:</span>{" "}
              {deliveryDateString}
            </div>

            <Link to="/address">
              <button className="mt-6 bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full text-white text-sm sm:text-base">
                Buy Now
              </button>
            </Link>
          </div>
        </div>

    
        <div className="mt-16 text-sm sm:text-base text-gray-400">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2"
            style={{ fontFamily: "'Libre Baskerville', serif" }}>
            Why Choose This Perfume?
          </h2>
          <p className="mb-3"
            style={{ fontFamily: "'Libre Baskerville', serif" }}>
            Oud Intense stands apart with its bold, long-lasting scent that’s
            crafted from rare ingredients. Whether you're stepping out for a date
            night or attending a classy event, this fragrance ensures you leave a
            lasting impression.
          </p>
          <p
            style={{ fontFamily: "'Libre Baskerville', serif" }}>
            All Metaman perfumes are paraben-free, cruelty-free, and bottled with
            precision for premium experiences.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
