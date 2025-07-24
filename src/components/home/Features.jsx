import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";


import f1 from "../../assets/FeatureImage/f1.png";
import f2 from "../../assets/FeatureImage/f2.jpg";
import f3 from "../../assets/FeatureImage/f3.jpg";

const features = [
    {
        image: f1,
        headerText: "Ha1o by Metaman",
        text: "Inspired by the glow of a halo, Ha1o captures the inner light and strength that drives us...",
    },
    {
        image: f2,
        headerText: "Five Signature Scents",
        text: "Experience Ha1o’s full range — made for the bold, the refined, and the daring...",
    },
    {
        image: f3,
        headerText: "The Story Behind the 1",
        text: "The ‘1’ in Ha1o represents singular excellence — inspired by KL Rahul’s legendary jersey...",
    },
];

export default function FeaturedSection() {
    const navigate = useNavigate();

    const [index, setIndex] = useState(0);
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % features.length);
        }, 5500);
        return () => clearInterval(timer);
    }, []);

    const handlePrev = () =>
        setIndex((prev) => (prev - 1 + features.length) % features.length);

    const handleNext = () =>
        setIndex((prev) => (prev + 1) % features.length);

    return (
        <section className="bg-black text-white py-20 px-6 md:px-20 relative">
            <motion.h2
                className="text-3xl md:text-5xl font-bold text-center mb-20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
            >
                Why Metaman?
            </motion.h2>

            <div
                className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto"
                ref={ref}
            >
                {/* IMAGE */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={features[index].image}
                        initial={{ opacity: 0, scale: 0.95, x: 40 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.92, x: -40 }}
                        transition={{ duration: 0.6 }}
                        className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl group"
                    >
                        <img
                            src={features[index].image}
                            alt="Feature"
                            className="w-full h-full object-cover transform transition-transform group-hover:scale-105 duration-500 ease-in-out"
                        />

                        {/* Arrows */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg hover:scale-110 transition"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg hover:scale-110 transition"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </motion.div>
                </AnimatePresence>

                {/* TEXT */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={features[index].text}
                        className="text-center md:text-left"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.h2
                            className="text-2xl md:text-4xl font-semibold mb-6"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 120 }}
                        >
                            {features[index].headerText}
                        </motion.h2>
                        <motion.p
                            className="text-lg leading-relaxed max-w-xl mb-8 text-gray-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                        >
                            {features[index].text}
                        </motion.p>

                        <motion.button
                            whileHover={{
                                scale: 1.06,
                                backgroundColor: "#ffffff",
                                color: "#000000",
                            }}
                            whileTap={{ scale: 0.94 }}
                            onClick={() => navigate('/about')}
                            className="px-5 py-2 border-2 border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 ease-in-out rounded-full font-medium"
                        >
                            Read More
                        </motion.button>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
