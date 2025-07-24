import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

function ProductCursor({ isVisible, x, y }) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed z-50 pointer-events-none hidden md:block"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, x: x, y: y, scale: 1.1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ type: "spring", stiffness: 180, damping: 13 }}
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400/40 to-pink-500/50 backdrop-blur-xl filter blur-sm animate-pulse border-2 border-white/70 shadow-2xl" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const ProductCard = ({ product, isReversed, bgColor }) => {
    if (!product) return null;

    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { damping: 20, stiffness: 120 });
    const smoothY = useSpring(mouseY, { damping: 20, stiffness: 120 });

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        const moveX = ((offsetX - rect.width / 2) / rect.width) * 60;
        const moveY = ((offsetY - rect.height / 2) / rect.height) * 60;
        mouseX.set(moveX);
        mouseY.set(moveY);
        setMousePos({ x: e.clientX - 14, y: e.clientY - 14 });
    };

    const revealVariants = {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0, transition: { type: "spring", duration: 0.8, delay: 0.2 } },
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                mouseX.set(0);
                mouseY.set(0);
                setIsHovered(false);
            }}
            className={`relative w-full ${bgColor} flex flex-col md:flex-row items-center justify-between gap-10 py-12 px-4 md:px-8 transition-all duration-500 min-h-[500px] overflow-visible ${isReversed ? "md:flex-row-reverse" : ""}`}
        >
            <ProductCursor isVisible={isHovered} x={mousePos.x} y={mousePos.y} />

            <motion.div
                style={{ x: smoothX, y: smoothY }}
                className="relative w-full md:w-1/2 overflow-hidden p-2 md:p-4 pointer-events-none"
            >
                <motion.img
                    src={product.pngImage}
                    alt={product.name}
                    className="w-full h-auto object-contain shadow-2xl"
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: isHovered ? 1.05 : 1 }}
                />
            </motion.div>

            <motion.div
                style={{ y: smoothY }}
                className="w-full md:w-1/2 text-white text-center md:text-left relative z-10"
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
            >
                <motion.h3
                    animate={{ scale: isHovered ? 1.06 : 1, textShadow: isHovered ? "0 8px 32px #2573fc70" : "none" }}
                    transition={{ type: "spring", stiffness: 180, damping: 15 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-gray-100 tracking-wide"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {product.name}
                </motion.h3>

                <motion.p
                    className="text-sm sm:text-base md:text-lg text-blue-100 mb-6 max-w-xl mx-auto md:mx-0"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                    Discover the essence of {product.name}. Feel confident all day.
                </motion.p>

                <div className="flex justify-center md:justify-start">
                    <Link to={`/product/${product.id}`}>
                        <motion.button
                            whileHover={{
                                scale: 1.1,
                                background: "linear-gradient(90deg,#3453fa 40%,#e23a9d 100%)",
                                color: "#fff",
                                boxShadow: "0 8px 44px #3453fa33",
                            }}
                            whileTap={{
                                scale: 0.95,
                                background: "linear-gradient(95deg,#182875,#e23a9d 100%)",
                            }}
                            className="px-5 py-2 text-sm sm:text-base md:px-8 md:py-2 md:text-lg bg-transparent border border-white rounded-2xl shadow-lg hover:text-white transition font-semibold tracking-wide relative overflow-hidden"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                            <span className="relative z-10">Shop Now</span>
                            <span
                                className="absolute left-[-30%] top-0 h-full w-2/3 pointer-events-none"
                                style={{
                                    background:
                                        "linear-gradient(110deg,rgba(255,255,255,0.18) 10%,rgba(255,255,255,0.04) 70%,rgba(255,255,255,0.08) 100%)",
                                    filter: "blur(10px)",
                                    transform: "skewX(-25deg)",
                                    animation: "shineMove 1.8s linear infinite",
                                }}
                            />
                            <style>
                                {`
                  @keyframes shineMove {
                    0% { left: -30%; }
                    65% { left: 110%; }
                    100% { left: 110%; }
                  }
                `}
                            </style>
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProductCard;
