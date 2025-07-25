import React, { useEffect, useRef, useState } from "react";
import { useGlobal } from "../../context/GlobalContext.jsx";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const ProductShowcase = () => {
    const { products } = useGlobal();
    const containerRef = useRef(null);
    const horizontalRef = useRef(null);
    const lastSlideRef = useRef(null);
    const [isDesktop, setIsDesktop] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px)");
        setIsDesktop(mediaQuery.matches);
        const handler = () => setIsDesktop(mediaQuery.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        if (!isDesktop || !horizontalRef.current || !containerRef.current) return;

        const sections = gsap.utils.toArray(".horizontal-slide");
        const slideWidth = horizontalRef.current.firstChild?.offsetWidth || 0;
        const totalScroll = slideWidth * products.length;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1,
                end: `+=${totalScroll}`,
                anticipatePin: 1,
                id: "horizontal-scroll",
            }
        });

        tl.to(horizontalRef.current, {
            x: () => -totalScroll,
            ease: "none",
        });

        sections.forEach((section) => {
            const image = section.querySelector(".card-img");
            const heading = section.querySelector(".card-title");
            const desc = section.querySelector(".card-desc");
            const buttons = section.querySelector(".card-buttons");

            gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    containerAnimation: tl,
                    start: "left 80%",
                    end: "right center",
                    scrub: true,
                }
            })
                .fromTo(section, { opacity: 0.4, scale: 0.92 }, {
                    opacity: 1, scale: 1, duration: 0.3, ease: "power2.out"
                })
                .fromTo(image, { y: 60, scale: 1.1, opacity: 0 }, {
                    y: 0, scale: 1, opacity: 1, duration: 0.6, ease: "power3.out"
                }, "<20%")
                .fromTo(heading, { y: 30, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.4
                }, "<10%")
                .fromTo(desc, { opacity: 0, y: 20 }, {
                    opacity: 1, y: 0, duration: 0.4
                }, "<10%")
                .fromTo(buttons, { opacity: 0 }, {
                    opacity: 1, duration: 0.3
                }, "-=0.2");
        });

        if (lastSlideRef.current) {
            ScrollTrigger.create({
                trigger: lastSlideRef.current,
                containerAnimation: tl,
                start: "left 50%",
                end: "left 51%",
                onEnter: () => {
                    ScrollTrigger.refresh();
                },
                once: true,
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [products, isDesktop]);

    const nextSlide = () => {
        if (currentIndex < products.length - 1) setCurrentIndex(prev => prev + 1);
    };
    const prevSlide = () => {
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    };

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen overflow-hidden bg-black text-white"
        >
            {isDesktop ? (
                <div
                    ref={horizontalRef}
                    className="absolute top-0 left-0 h-full flex"
                >
                    <div className="w-[40vw]" />
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            ref={index === products.length - 1 ? lastSlideRef : null}
                            className="horizontal-slide w-[30vw] h-full flex flex-col items-center justify-center px-4"
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="relative w-full overflow-hidden py-12">
                    {/* Slider Container */}
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * 100}vw)`,
                            width: `${products.length * 100}vw`,
                        }}
                    >
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="w-screen flex-shrink-0 px-6 flex justify-center"
                            >
                                <div className="max-w-xs sm:max-w-sm w-full">
                                    <ProductCard product={product} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 sm:px-6 -translate-y-1/2">
                        <button
                            onClick={prevSlide}
                            className="bg-white/20 text-white text-xl px-3 py-2 rounded-full disabled:opacity-30"
                            disabled={currentIndex === 0}
                        >
                            <ChevronLeft />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="bg-white/20 text-white text-xl px-3 py-2 rounded-full disabled:opacity-30"
                            disabled={currentIndex === products.length - 1}
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

function ProductCard({ product }) {
    return (
        <div className="flex flex-col items-center">
            <div className="relative w-full h-[400px] overflow-hidden rounded-xl shadow-2xl card-img">
                <img
                    src={product.image1}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
            <h3 className="text-2xl font-bold mt-6 mb-2 text-center card-title">
                {product.name}
            </h3>
            <p className="text-center text-gray-300 max-w-md card-desc"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {product.description || "Discover more about this fragrance."}
            </p>
            <div className="flex justify-center gap-4 mt-4 card-buttons">
                <Link
                    to={`/product/${product.id}`}
                    className="px-4 py-1.5 border border-pink-500 text-pink-500 font-medium rounded hover:bg-pink-500 hover:text-white transition"
                >
                    Buy Now
                </Link>
                {/* <a
                    href={product.link}
                    className="px-4 py-1.5 border border-white font-medium rounded hover:bg-white hover:text-black transition"
                >
                    Add to Cart
                </a> */}
            </div>
        </div>
    );
}


export default ProductShowcase;