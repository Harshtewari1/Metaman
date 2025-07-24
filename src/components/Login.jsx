import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const loginBox = useRef(null);
  const leftImageRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (loginBox.current) {
      gsap.fromTo(
        loginBox.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: loginBox.current,
            start: "top 90%",
          },
        }
      );
    }
    if (leftImageRef.current) {
      gsap.fromTo(
        leftImageRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: leftImageRef.current,
            start: "top 90%",
          },
        }
      );
    }
  }, []);

  const handleLogin = () => {
    setError("");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    if (user?.email === email && user?.password === password) {
      login();
      navigate("/");
    } else {
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div
        ref={loginBox}
        className="flex flex-col md:flex-row items-center justify-around bg-gray-900/90 rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl backdrop-blur-lg border border-white/10"
      >
        {/* Image Section */}
        <motion.div
          ref={leftImageRef}
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 h-64 md:h-full hidden md:flex items-center justify-center bg-gradient-to-tr "
        >
          <img
            src="https://metaman.in/cdn/shop/files/pack_of_6.jpg?v=1725051647&width=1080"
            alt="Login Visual"
            className="w-[350px] h-auto rounded-xl shadow-lg object-cover"
          />
        </motion.div>

        {/* Login Form */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 text-white"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <h2
            className="text-3xl font-bold mb-8 text-center tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "0.03em" }}
          >
            Login
          </h2>

          {error && <div className="mb-4 text-red-400 font-semibold">{error}</div>}

          <motion.input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="off"
            whileFocus={{ borderColor: "#38bdf8", boxShadow: "0 0 0 2px #38bdf850" }}
            className="mb-4 w-full max-w-xs px-4 py-2 rounded bg-gray-800 border-2 border-gray-700 focus:outline-none transition-all duration-200 font-medium"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          />
          <motion.input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="off"
            whileFocus={{ borderColor: "#fb7185", boxShadow: "0 0 0 2px #fb718561" }}
            className="mb-6 w-full max-w-xs px-4 py-2 rounded bg-gray-800 border-2 border-gray-700 focus:outline-none transition-all duration-200 font-medium"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          />

          <motion.button
            onClick={handleLogin}
            whileHover={{ scale: 1.07, backgroundColor: "#2563eb", boxShadow: "0 4px 32px #2237ea33" }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 220 }}
            className="mb-4 w-full max-w-xs px-4 py-2 bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-900 hover:from-blue-800 hover:to-indigo-900 rounded-lg shadow-lg font-bold text-lg transition-all duration-200"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.02em" }}
          >
            Login
          </motion.button>

          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <motion.button
              whileHover={{ color: "#38bdf8", textDecoration: "underline" }}
              onClick={() => navigate("/signup")}
              className="text-blue-400 font-semibold ml-1"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Sign Up
            </motion.button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}


export default Login;