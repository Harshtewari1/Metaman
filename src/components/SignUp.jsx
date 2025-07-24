import React, { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import {useGlobal} from '../context/GlobalContext.jsx'


gsap.registerPlugin(ScrollTrigger);

const SignUp = () => {
    const { setName, setEmail, setPassword ,email , password ,name } = useGlobal();
    const navigate = useNavigate();
    const formRef = useRef(null);
    const imageRef = useRef(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (formRef.current) {
            gsap.fromTo(
                formRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: "top 80%",
                    },
                }
            );
        }

        if (imageRef.current) {
            gsap.fromTo(
                imageRef.current,
                { x: -100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.2,
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: "top 85%",
                    },
                }
            );
        }
    }, []);

    const handleSignup = () => {
        setError("");
        if (!email || !password) {
            setError("Please enter email and password");
            return;
        }
        const user = { email, password ,name };
        localStorage.setItem("user", JSON.stringify(user));
        alert("Signup successful!");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="flex flex-col md:flex-row justify-around items-center w-[90%] md:w-[80%] bg-gray-900/90 backdrop-blur rounded-2xl overflow-hidden shadow-lg border border-white/10">

                {/* Image Section */}
                <div
                    ref={imageRef}
                    className="w-full md:w-1/2 h-64 md:h-[500px] bg-gradient-to-br  flex items-center justify-center"
                >
                    <img
                        src="https://metaman.in/cdn/shop/files/pack_of_6.jpg?v=1725051647&width=1080"
                        alt="signup"
                        className="w-[300px] h-auto rounded-xl object-cover shadow-xl"
                    />
                </div>

                {/* Form Section */}
                <motion.div
                    ref={formRef}
                    className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 text-white"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 1 }}
                >
                    <h2
                        className="text-4xl font-bold mb-8 tracking-wide text-center"
                        style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "0.03em" }}
                    >
                        Sign Up
                    </h2>

                    {error && (
                        <div className="mb-4 text-red-400 font-semibold text-sm">{error}</div>
                    )}

                    <motion.input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Name"
                        autoComplete="off"
                        whileFocus={{
                            borderColor: "#2563eb",
                            boxShadow: "0 0 0 2px #2563eb75",
                        }}
                        className="mb-5 w-full max-w-xs px-4 py-2 rounded bg-gray-800 border-2 border-gray-700 text-white font-medium focus:outline-none"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />

                    {/* Email Input */}
                    <motion.input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        autoComplete="off"
                        whileFocus={{
                            borderColor: "#2563eb",
                            boxShadow: "0 0 0 2px #2563eb75",
                        }}
                        className="mb-5 w-full max-w-xs px-4 py-2 rounded bg-gray-800 border-2 border-gray-700 text-white font-medium focus:outline-none"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />


                    {/* Password Input */}
                    <motion.input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        autoComplete="off"
                        whileFocus={{
                            borderColor: "#fb7185",
                            boxShadow: "0 0 0 2px #fb718580",
                        }}
                        className="mb-6 w-full max-w-xs px-4 py-2 rounded bg-gray-800 border-2 border-gray-700 text-white font-medium focus:outline-none"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />

                    {/* Signup Button */}
                    <motion.button
                        onClick={handleSignup}
                        whileHover={{
                            scale: 1.05,
                            backgroundColor: "#2563eb",
                            boxShadow: "0 8px 20px #2563eb44",
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 220 }}
                        className="mb-6 w-full max-w-xs px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 font-bold text-white text-lg"
                        style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.02em" }}
                    >
                        Sign Up
                    </motion.button>

                    {/* Login Redirect */}
                    <p className="text-sm text-gray-400">
                        Already have an account?{" "}
                        <motion.button
                            onClick={() => navigate("/login")}
                            whileHover={{ color: "#38bdf8", textDecoration: "underline" }}
                            className="text-blue-400 font-semibold ml-1"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                            Login
                        </motion.button>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

export default SignUp