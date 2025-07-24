import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const videos = [
    "https://www.instagram.com/reel/DHJEFsrzkBd/",
    "https://www.instagram.com/reel/DF-NZBKNBt8/",
    "https://www.instagram.com/reel/DEkFruLSqpJ/",
    "https://www.instagram.com/reel/DEzkktMNkDW/",
    "https://www.instagram.com/reel/DGxscrDtEg1/",
    "https://www.instagram.com/reel/DBi_mITtSRU/",
    "https://www.instagram.com/reel/DAX2l8ePDrd/",
];

export default function Collab() {
    const containerRef = useRef(null);

    // Inject Instagram embed script
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Re-process embeds when component mounts
    useEffect(() => {
        if (window.instgrm) {
            try {
                window.instgrm.Embeds.process();
            } catch (err) {
                console.warn("Instagram embed error", err);
            }
        }
    }, [videos]);

    return (
        <section
            className="hidden md:block bg-black text-white py-20 px-6 md:px-20 overflow-hidden relative"
        >
            {/* Title */}
            <motion.h2
                className="text-3xl md:text-4xl font-bold text-center mb-12"
                style={{ fontFamily: "'Playfair Display', serif" }}
                initial={{ opacity: 0, y: 30, letterSpacing: "-1px" }}
                whileInView={{ opacity: 1, y: 0, letterSpacing: "0", transition: { duration: 1 } }}
                viewport={{ once: true }}
            >
                Trusted by Our Fragrance Family
            </motion.h2>

            {/* Reel Showcase */}
            <div ref={containerRef} className="relative overflow-hidden">
                <div className="flex gap-8 animate-scroll-left w-max">
                    {[...videos, ...videos].map((url, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="min-w-[300px] max-w-[350px] rounded-xl bg-white/10 backdrop-blur-md shadow-lg p-1 hover:border hover:border-blue-500 transition duration-300"
                        >
                            <blockquote
                                className="instagram-media"
                                data-instgrm-permalink={url}
                                data-instgrm-version="14"
                                style={{ width: "100%", margin: "auto" }}
                            ></blockquote>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Scroll Animation */}
            <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-left {
          animation: scroll-left 70s linear infinite;
        }
      `}</style>
        </section>
    );
}
