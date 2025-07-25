import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ATM_IMAGE_URL =
    "https://imgs.search.brave.com/apSUu3OWdtg9jex2gzUp9qBLGFsB6ioFJ187XEuOZ2g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/Y3JlZGl0LWNhcmQt/bW9ja3VwLWRlc2ln/bi13aXRoLWZyb250/LWJhY2tfMTAxNy0z/NjIwOC5qcGc_c2Vt/dD1haXNfaXRlbXNf/Ym9vc3RlZCZ3PTc0/MA";

const CheckoutForm = () => {
    const [form, setForm] = useState({
        nameOnCard: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    const [errors, setErrors] = useState({});
    const [showThankYou, setShowThankYou] = useState(false);

    const navigate = useNavigate();

    
    const validateExpiry = (val) => {
        if (val.length !== 5) return "Expiry must be in MM/YY format";
        if (!/^\d{2}\/\d{2}$/.test(val)) return "Expiry must be in MM/YY format";

        const [mm, yy] = val.split("/").map(Number);
        if (mm < 1 || mm > 12) return "Month must be between 01 and 12";
        // Year can be anything now
        return "";
    };


    
    const formatExpiry = (value) => {
        
        let v = value.replace(/[^\d]/g, "");
        if (v.length > 4) v = v.slice(0, 4);

        if (v.length >= 3) {
            return v.slice(0, 2) + "/" + v.slice(2);
        }
        if (v.length >= 1) {
            return v;
        }
        return "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let val = value;
        let newErrors = { ...errors };

        if (name === "nameOnCard") {
            
            val = val.replace(/[^a-zA-Z.\s]/g, "");
            if (val.trim() === "") newErrors[name] = "Name is required";
            else delete newErrors[name];
        }

        if (name === "cardNumber") {
            
            val = val.replace(/\D/g, "").slice(0, 12);
            if (val.length < 12)
                newErrors[name] = "Card number must be 12 digits";
            else delete newErrors[name];
        }

        if (name === "expiry") {
            val = formatExpiry(val);
          
            if (val.length === 5) {
                const expiryError = validateExpiry(val);
                if (expiryError) newErrors[name] = expiryError;
                else delete newErrors[name];
            } else {
                newErrors[name] = "Expiry must be in MM/YY format";
            }
        }

        if (name === "cvv") {
            val = val.replace(/\D/g, "").slice(0, 3);
            if (val.length < 3) newErrors[name] = "CVV must be 3 digits";
            else delete newErrors[name];
        }

        setForm((prev) => ({ ...prev, [name]: val }));
        setErrors(newErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
        const newErrors = {};
        if (form.nameOnCard.trim() === "") newErrors.nameOnCard = "Name is required";
        if (form.cardNumber.length !== 12) newErrors.cardNumber = "Card number must be 12 digits";
        const expiryError = validateExpiry(form.expiry);
        if (expiryError) newErrors.expiry = expiryError;
        if (form.cvv.length !== 3) newErrors.cvv = "CVV must be 3 digits";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        
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
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                       
                        <div>
                            <input
                                type="text"
                                name="nameOnCard"
                                placeholder="Name on Card"
                                value={form.nameOnCard}
                                onChange={handleChange}
                                className={`block w-full px-4 py-2 border rounded-lg text-base text-gray-800 focus:outline-none transition 
                  ${errors.nameOnCard ? "border-red-500 focus:ring-red-500" : "border-blue-200 focus:ring-blue-400"}`}
                            />
                            {errors.nameOnCard && (
                                <p className="mt-1 text-sm text-red-600">{errors.nameOnCard}</p>
                            )}
                        </div>

                        
                        <div>
                            <input
                                type="text"
                                name="cardNumber"
                                placeholder="Card Number"
                                maxLength="12"
                                value={form.cardNumber}
                                inputMode="numeric"
                                onChange={handleChange}
                                className={`block w-full px-4 py-2 border rounded-lg text-base text-gray-800 focus:outline-none transition 
                  ${errors.cardNumber ? "border-red-500 focus:ring-red-500" : "border-blue-200 focus:ring-blue-400"}`}
                            />
                            {errors.cardNumber && (
                                <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                            )}
                        </div>

                        
                        <div>
                            <input
                                type="text"
                                name="expiry"
                                placeholder="MM/YY"
                                maxLength="5"
                                value={form.expiry}
                                onChange={handleChange}
                                className={`block w-full px-4 py-2 border rounded-lg text-base text-gray-800 focus:outline-none transition 
                  ${errors.expiry ? "border-red-500 focus:ring-red-500" : "border-blue-200 focus:ring-blue-400"}`}
                            />
                            {errors.expiry && (
                                <p className="mt-1 text-sm text-red-600">{errors.expiry}</p>
                            )}
                        </div>

                        
                        <div>
                            <input
                                type="password"
                                name="cvv"
                                placeholder="CVV"
                                maxLength="3"
                                value={form.cvv}
                                inputMode="numeric"
                                onChange={handleChange}
                                className={`block w-full px-4 py-2 border rounded-lg text-base text-gray-800 focus:outline-none transition 
                  ${errors.cvv ? "border-red-500 focus:ring-red-500" : "border-blue-200 focus:ring-blue-400"}`}
                            />
                            {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
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
                            <div className="text-gray-700 text-lg">Redirecting to homepage…</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutForm;
