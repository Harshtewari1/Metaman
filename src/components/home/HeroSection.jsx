import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // ✅ for navigation
import bgVideo from "../../assets/Home.mp4";

const HeroSection = () => {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-black">
            {/* Background Video Layer 1 */}
            <video
                className="absolute top-0 left-0 w-full h-full z-0 opacity-80"
                src={bgVideo}
                autoPlay
                loop
                muted
                playsInline
            />

            {/* Background Video Layer 2 (optional for shine) */}
            <video
                className="hidden sm:block absolute top-0 left-0 w-full h-full object-cover z-0 opacity-20 mix-blend-screen"
                src={bgVideo}
                autoPlay
                loop
                muted
                playsInline
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-6">
                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 40, letterSpacing: "-0.06em", filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, letterSpacing: "0.02em", filter: "blur(0px)" }}
                    transition={{ duration: 1.6, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-bold text-white mb-6 select-none"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Unleash Your Style. Own Your Scent.
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 32, filter: "blur(3px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.3, duration: 1.2 }}
                    className="text-white text-xl max-w-2xl mb-7 select-none"
                    style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.01em" }}
                >
                    Elevate your style with Metaman fragrances — curated for the modern man.
                </motion.p>

                {/* Explore Button wrapped with Link */}
                <Link to="/products">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.91 }}
                        animate={{ opacity: 1, scale: 1, boxShadow: "0 4px 32px 0 rgba(33,121,238,0.07)" }}
                        whileHover={{
                            scale: 1.08,
                            background: "linear-gradient(95deg, #253241 60%, #428bca 100%)",
                            color: "#fff",
                            boxShadow: "0 8px 44px 0 rgba(66,139,202,0.24)",
                            transition: { duration: 1, ease: "easeOut", type: "tween" } // <-- smooth 1s scale transition on hover
                        }}
                        whileTap={{
                            scale: 0.96,
                            boxShadow: "0 2px 14px 0 rgba(66,139,202,0.15)",
                            background: "linear-gradient(95deg,#253241 70%,#0450a4 100%)",
                            transition: { duration: 0.2 } // tap fast response
                        }}
                        transition={{ delay: 0.57, duration: 0.6, type: "spring" }}
                        className="px-39 py-5 text-white font-bold text-lg md:text-2xl rounded-full mt-3 border-2 border-white shadow-xl bg-gradient-to-r from-slate-800 
        transition-all duration-300 select-none relative overflow-hidden focus:outline-none cursor-pointer"
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            letterSpacing: "0.03em",
                            textShadow: "0 2px 8px rgba(0,30,80,0.13)"
                        }}
                    >
                        Explore Collection
                    </motion.button>

                </Link>
            </div>
        </section>
    );
}

export default HeroSection;