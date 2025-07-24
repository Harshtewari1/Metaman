"use client";
import React from "react";
import MetamanLogo from "../assets/Metaman.png";

export default function Footer() {
    return (
        <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-12">
            {/* Logo Section */}
            <div className="flex justify-center sm:justify-start mb-10">
                <img
                    src={MetamanLogo}
                    alt="Metaman Logo"
                    className="h-12 w-auto filter brightness-200"
                />
            </div>

            {/* Grid Section */}
            <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {/* Quick Links */}
                <div>
                    <p className="font-semibold uppercase mb-3">Quick Links</p>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">FAQs</a></li>
                        <li><a href="#">Shop All</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </div>

                {/* Legal Info */}
                <div>
                    <p className="font-semibold uppercase mb-3">Legal Information</p>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Cancellation Policy</a></li>
                        <li><a href="#">Refund Policy</a></li>
                        <li><a href="#">Shipping Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="lg:col-span-2">
                    <p className="font-semibold uppercase mb-3">Newsletter</p>
                    <p className="text-sm text-gray-400 mb-4">
                        Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full sm:flex-1 px-4 py-2 bg-transparent border-b border-gray-400 text-white focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="text-sm font-medium uppercase text-white border-b border-white hover:text-pink-500 hover:border-pink-500 transition"
                        >
                            Join
                        </button>
                    </form>
                    <p className="text-xs text-gray-500 mt-3 italic">
                        This site is protected by hCaptcha and the hCaptcha Privacy Policy and Terms of Service apply.
                    </p>
                </div>
            </div>
        </footer>
    );
}
