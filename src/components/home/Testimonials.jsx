
import React, { useEffect, useRef, useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Aarav Mehta",
    message: "This product changed my life. The fragrance is just perfect!",
    title: "Lifestyle Blogger",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    name: "Sara Khan",
    message: "Absolutely love the packaging and long-lasting effect!",
    title: "Instagram Influencer",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    name: "Rohit Sharma",
    message: "Looks luxurious and smells amazing. Highly recommended.",
    title: "Fragrance Enthusiast",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    name: "Anjali Verma",
    message: "A gift-worthy fragrance with great packaging and scent!",
    title: "Beauty Youtuber",
    image: "https://randomuser.me/api/portraits/women/14.jpg",
  },
  {
    name: "Kunal Roy",
    message: "My go-to perfume for every occasion. Super elegant.",
    title: "Perfume Collector",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
  },
  {
    name: "Priya Desai",
    message: "I get compliments every time I wear it. Love it!",
    title: "Fashion Enthusiast",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
];

export default function TestimonialSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / cardsPerPage);
  const autoSlideRef = useRef();

  useEffect(() => {
    autoSlideRef.current = setInterval(() => {
      nextPage();
    }, 10000);

    return () => clearInterval(autoSlideRef.current);
  }, []);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentTestimonials = testimonials.slice(
    currentPage * cardsPerPage,
    currentPage * cardsPerPage + cardsPerPage
  );

  return (
    <section className="bg-black text-white py-20 px-6 md:px-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
        <p className="text-gray-400">Real feedback from our fragrance lovers</p>
      </div>

      <div className="relative">
        {/* Arrows */}
        <button
          onClick={prevPage}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full z-10"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={nextPage}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full z-10"
        >
          <ChevronRight />
        </button>

        {/* Testimonials */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {currentTestimonials.map((testimonial, index) => (
              <Tilt
                key={index}
                tiltMaxAngleX={20}
                tiltMaxAngleY={20}
                perspective={1000}
                transitionSpeed={700}
                scale={1.05}
                glareEnable={true}
                glareMaxOpacity={0.3}
                glareColor="#ffffff"
                glarePosition="all"
                className="bg-[#1a1a1a] p-6 rounded-2xl shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border border-white"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.title}</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">"{testimonial.message}"</p>
              </Tilt>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
