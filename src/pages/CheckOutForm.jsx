import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ATM_IMAGE_URL = "https://imgs.search.brave.com/apSUu3OWdtg9jex2gzUp9qBLGFsB6ioFJ187XEuOZ2g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/Y3JlZGl0LWNhcmQt/bW9ja3VwLWRlc2ln/bi13aXRoLWZyb250/LWJhY2tfMTAxNy0z/NjIwOC5qcGc_c2Vt/dD1haXNfaXRlbXNf/Ym9vc3RlZCZ3PTc0/MA";

const CheckoutForm = () => {
    const [form, setForm] = useState({
        nameOnCard: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });
    const [showThankYou, setShowThankYou] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowThankYou(true);
        setTimeout(() => {
            setShowThankYou(false);
            navigate("/");
        }, 2000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 py-10 px-2">
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
                <button
                    onClick={() => navigate("/")}
                    className="absolute top-4 right-4 z-20 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label="Close and return home"
                >
                    <svg
                        className="w-6 h-6 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 p-8 w-96">
                    <img
                        src={ATM_IMAGE_URL}
                        alt="ATM Card"
                        className="rounded-xl shadow-lg w-72 h-44 object-cover"
                    />
                    <div className="text-white mt-6 text-center text-xl font-semibold tracking-wide">
                        Secure Card Payment
                    </div>
                </div>

                <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
                        Paytm Payment Gateway
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="text"
                            name="nameOnCard"
                            required
                            placeholder="Name on Card"
                            value={form.nameOnCard}
                            autoComplete="cc-name"
                            onChange={handleChange}
                            className="block w-full px-4 py-2 border border-blue-200 rounded-lg text-base text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition"
                        />
                        <input
                            type="text"
                            name="cardNumber"
                            required
                            inputMode="numeric"
                            placeholder="Card Number"
                            maxLength="19"
                            autoComplete="cc-number"
                            value={form.cardNumber}
                            onChange={handleChange}
                            className="block w-full px-4 py-2 border border-blue-200 rounded-lg text-base text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition"
                        />
                        <div className="flex gap-4">
                            <input
                                type="text"
                                name="expiry"
                                required
                                placeholder="MM/YY"
                                maxLength="5"
                                autoComplete="cc-exp"
                                value={form.expiry}
                                onChange={handleChange}
                                className="w-1/2 px-4 py-2 border border-blue-200 rounded-lg text-base text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition"
                            />
                            <input
                                type="password"
                                name="cvv"
                                required
                                inputMode="numeric"
                                maxLength="4"
                                autoComplete="cc-csc"
                                placeholder="CVV"
                                value={form.cvv}
                                onChange={handleChange}
                                className="w-1/2 px-4 py-2 border border-blue-200 rounded-lg text-base text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white rounded-full text-lg font-semibold shadow transition-all duration-150 active:scale-95 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Pay Now
                        </button>
                    </form>
                </div>

                {showThankYou && (
                    <div className="absolute inset-0 flex items-center justify-center bg-blue-100 bg-opacity-60 z-30">
                        <div className="bg-white rounded-2xl shadow-xl px-10 py-8 text-center">
                            <div className="text-2xl font-bold text-blue-700 mb-2">
                                Thank you for shopping with us!
                            </div>
                            <div className="text-gray-700 text-lg">
                                Redirecting to homepage…
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutForm;
