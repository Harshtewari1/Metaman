// PaymentPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function PaymentPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        cardHolder: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
        accountNumber: "",
        
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePay = () => {
        alert("Payment Initiated ");
        navigate("/")
    };

    const handleCancel = () => {
        alert("Payment Cancelled");
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-8">
            <div className="bg-blue-100 shadow-2xl rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Payment Gateway</h2>

                <div className="space-y-4">
                    <input
                        type="text"
                        name="cardHolder"
                        placeholder="Card Holder Name"
                        value={form.cardHolder}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                    />
                    <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={form.cardNumber}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                    />
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            name="expiry"
                            placeholder="MM/YY"
                            value={form.expiry}
                            onChange={handleChange}
                            className="w-1/2 border p-2 rounded-md"
                        />
                        <input
                            type="password"
                            name="cvv"
                            placeholder="CVV"
                            value={form.cvv}
                            onChange={handleChange}
                            className="w-1/2 border p-2 rounded-md"
                        />
                    </div>
                    <input
                        type="text"
                        name="accountNumber"
                        placeholder="Bank Account Number (optional)"
                        value={form.accountNumber}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                    />
                    
                </div>

                <div className="mt-6 flex justify-between space-x-4">
                    <button
                        onClick={handleCancel}
                        className="w-1/2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        
                        onClick={handlePay}
                        className="w-1/2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
                    >
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
}
