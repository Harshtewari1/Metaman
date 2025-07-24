
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Canvas } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { Environment } from "@react-three/drei";
import f1 from "../assets/FeatureImage/f1.png";



const metamanFullText = `
At Metaman, we believe that a fragrance is more than just a scent; it's an experience, a statement, and a reflection of one's personality. Our collection features meticulously crafted perfumes designed for every occasion, ensuring you always have the perfect scent to complement your style.

Our Story
Metaman was born from a passion for excellence and a desire to bring the finest fragrances to life. Our journey began with the vision to create a brand that offers not just perfumes, but an olfactory experience that captivates and inspires. Drawing on the rich heritage and expertise of Drip Project, we have seamlessly blended artistry with craftsmanship to develop a line of perfumes that are both timeless and contemporary.

Our Commitment
At Metaman, we are dedicated to quality and sustainability. Our perfumes are crafted using the finest ingredients, ensuring a long-lasting and memorable scent.
`;

const metamanPreview =
    "Metaman is a fragrance brand founded by KL Rahul and Drip Project committed to crafting unforgettable scents that embody elegance, sophistication, and individuality. Metaman marks an exciting expansion into the world of high-end perfumes ...";


// 3D subtle looping background shape (optional)
function GlassSphereBg() {
    return (
        <Float speed={1} floatIntensity={0.28}>
            <mesh scale={[6, 6, 6]} position={[0, 0, -7]} rotation={[0, 0, 0]}>
                <sphereGeometry args={[1, 78, 58]} />
                <MeshTransmissionMaterial
                    thickness={2.5}
                    transmission={1}
                    roughness={0.12}
                    ior={1.21}
                    color="#59a6ee"
                    attenuationColor="#177cdc"
                    attenuationDistance={0.92}
                    anisotropy={0.12}
                    chromaticAberration={0.13}
                    distortion={0.25}
                />
            </mesh>
        </Float>
    );
}

export default function AboutPage() {
    
    const [expanded, setExpanded] = useState(false);
    // Section 1 Reveal on Scroll
    const [sect1Ref, sect1InView] = useInView({ triggerOnce: true, threshold: 0.3 });
    // Section 2 Reveal
    const [sect2Ref, sect2InView] = useInView({ triggerOnce: true, threshold: 0.15 });
    // Section 3 Reveal
    const [sect3Ref, sect3InView] = useInView({ triggerOnce: true, threshold: 0.15 });

    return (
        <div className="relative bg-[#0f0f0f] text-white font-sans overflow-x-hidden min-h-screen">
            {/* --- 3D Animated Wave Background (subtle, fixed) --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <Canvas camera={{ position: [0, 0, 22], fov: 42 }}>
                    <ambientLight intensity={0.5} />
                    <GlassSphereBg /> 
                    
                    <Environment preset="night" />
                </Canvas>
            </div>
            <div className="relative z-10">
                {/* Section 1 */}
                <section className="min-h-screen flex items-center justify-center px-6 text-center">
                    <motion.div
                        ref={sect1Ref}
                        initial="hidden"
                        animate={sect1InView ? "visible" : "hidden"}
                        variants={{
                            hidden: { opacity: 0, y: 60 },
                            visible: { opacity: 1, y: 0, transition: { duration: 1.1, type: "spring" } }
                        }}
                    >
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold text-[#ffffff]"
                            initial={{ letterSpacing: "-0.12em" }}
                            animate={sect1InView ? { letterSpacing: "0.02em", transition: { duration: 1 } } : {}}
                        >
                            Redefining Men’s Grooming
                        </motion.h1>
                        <motion.p
                            className="mt-4 max-w-xl mx-auto text-gray-400"
                            initial={{ opacity: 0, y: 24 }}
                            animate={sect1InView ? { opacity: 1, y: 0, transition: { delay: 0.3, duration: 1.2 } } : {}}
                        >
                            At Metaman, we believe that grooming isn’t just about appearance—it's about confidence, presence, and lifestyle.
                        </motion.p>
                    </motion.div>
                </section>

                {/* Section 2 */}
                <section className="min-h-fit lg:min-h-screen flex items-center justify-center px-6 bg-[#171717] py-16">
                    <div className="text-start w-full max-w-4xl mx-auto">
                        <h2 className="text-5xl sm:text-7xl font-extrabold my-10 text-[#63c3fd]">About Us</h2>
                        <AnimatePresence initial={false}>
                            {expanded ? (
                                <motion.p
                                    key="full"
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0, transition: { duration: 0.55 } }}
                                    exit={{ opacity: 0, y: 40, transition: { duration: 0.35 } }}
                                    className="mt-4 text-gray-300 text-lg sm:text-2xl whitespace-pre-line"
                                >
                                    {metamanFullText}
                                    <br />
                                    <span
                                        className="inline-block mt-2 underline font-semibold text-blue-400 cursor-pointer hover:text-blue-300 transition"
                                        onClick={() => setExpanded(false)}
                                        tabIndex={0}
                                        role="button"
                                    >
                                        Show less
                                    </span>
                                </motion.p>
                            ) : (
                                <motion.p
                                    key="preview"
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0, transition: { duration: 0.45 } }}
                                    exit={{ opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                    className="mt-4 text-gray-300 text-lg sm:text-2xl"
                                >
                                    {metamanPreview}
                                    <span
                                        className="ml-2 underline font-semibold text-blue-400 cursor-pointer hover:text-blue-300 transition"
                                        onClick={() => setExpanded(true)}
                                        tabIndex={0}
                                        role="button"
                                    >
                                        Read more
                                    </span>
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </section>


                {/* Section 3 (Animated Product Image + 3D Photo reveal) */}
                <section className="min-h-screen flex items-center justify-center px-6 bg-[#0f0f0f]">
                    <motion.div
                        ref={sect3Ref}
                        className="grid md:grid-cols-2 gap-10 items-center max-w-6xl w-full"
                        initial={{ opacity: 0, y: 40 }}
                        animate={sect3InView ? { opacity: 1, y: 0, transition: { duration: 1 } } : {}}
                    >
                        {/* 3D Zoom/Parallax on image */}
                        <motion.div
                            whileHover={{ scale: 1.04, rotateY: 9 }}
                            transition={{ type: "spring", stiffness: 210 }}
                            className="rounded-xl shadow-lg w-full object-cover relative overflow-hidden group"
                            style={{ perspective: "1200px" }}
                        >
                            <motion.img
                                src={f1}
                                alt="Product"
                                className="rounded-xl shadow-lg w-full object-cover"
                                initial={{ scale: 0.93, filter: "blur(6px) brightness(0.8)" }}
                                animate={sect3InView
                                    ? { scale: 1, filter: "blur(0px) brightness(1)", transition: { delay: 0.2, duration: 1.2 } }
                                    : {}}
                            />
                            {/* Optional animated overlay or light sparkle here */}
                        </motion.div>
                        <div>
                            <motion.h2
                                className="text-4xl font-semibold"
                                initial={{ opacity: 0, x: 48 }}
                                animate={sect3InView
                                    ? { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.9 } }
                                    : {}}
                            >
                                Meet Our Brand Ambassador
                            </motion.h2>
                            <motion.p
                                className="mt-4 text-gray-400"
                                initial={{ opacity: 0, x: 48 }}
                                animate={sect3InView
                                    ? { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.9 } }
                                    : {}}
                            >
We are proud to have renowned cricketer KL Rahul as our brand ambassador and investor. His dedication, passion, and excellence on and off the field perfectly align with the values of Metaman.                             </motion.p>
                        </div>
                    </motion.div>
                </section>          
        
            </div>
        </div>
    );
}
