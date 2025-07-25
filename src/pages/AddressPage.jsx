import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddressPage = () => {
   

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        notes: "",
    });
    const [saved, setSaved] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setSaved(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSaved(true);
        navigate("/checkoutForm");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black py-8 px-2">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden relative">
                
                <button
                    onClick={() => navigate("/")}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Cancel and go home"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

               
                <div className="flex-1 p-6 sm:p-10">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center md:text-left">
                        Shipping Address
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                       
                        <input
                            type="text"
                            name="fullName"
                            required
                            placeholder="Full Name"
                            autoComplete="name"
                            value={form.fullName}
                            onChange={handleChange}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                        <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="Phone Number"
                            autoComplete="tel"
                            value={form.phone}
                            onChange={handleChange}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address (optional)"
                            autoComplete="email"
                            value={form.email}
                            onChange={handleChange}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                        <input
                            type="text"
                            name="address"
                            required
                            placeholder="Full Address"
                            autoComplete="street-address"
                            value={form.address}
                            onChange={handleChange}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                        <textarea
                            name="notes"
                            placeholder="Order notes (optional)"
                            value={form.notes}
                            onChange={handleChange}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                            rows={2}
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full py-3 mt-1 bg-blue-600 text-white rounded-full text-lg font-semibold shadow transition-all duration-150 active:scale-95 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            Save Address
                        </button>
                        {saved && (
                            <div className="mt-3 text-green-700 bg-green-100 rounded-md py-2 px-4 text-center">
                                Address Saved Successfully!
                            </div>
                        )}
                    </form>
                </div>

                
                <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-blue-100 p-8 w-96">
                    <svg
                        className="w-20 h-20 mb-4 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.72 9.42a6 6 0 10-9.43 7.18c.23.3.35.67.33 1.07L7.33 21a1 1 0 001.31 1.23l2.48-.83c.4-.13.83-.08 1.2.13a6 6 0 004.4-6.11c-.01-.61.22-1.19.6-1.61z"
                        />
                    </svg>
                    <div className="text-lg font-medium text-blue-700 text-center">
                        Your address makes delivery easier and faster!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressPage;
