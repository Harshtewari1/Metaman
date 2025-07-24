
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // for navigation after logout
import { motion } from "framer-motion";

const ProfileCard = () => {
    const navigate = useNavigate();
    const [editing, setEditing] = React.useState(false);
    const [fields, setFields] = React.useState({
        fullName: "",
        email: "",
        number: "",
        city: "",
    });

    // Load data from localStorage on mount
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setFields((prev) => ({
                ...prev,
                fullName: storedUser.name || "",
                email: storedUser.email || ""
            }));
        }
    }, []);

    const handleChange = (e) => {
        setFields({ ...fields, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        setEditing(!editing);
    };

    const handleLogout = () => {
        localStorage.removeItem("user"); // clear cache
        navigate("/login"); // redirect to login
    };

    return (
        <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", duration: 1.1 }}
            className="w-[95vw] max-w-[420px] rounded-2xl shadow-2xl border border-white backdrop-blur-2xl px-0 pt-2 pb-5 flex flex-col mx-auto"
        >
            {/* Profile Image, Name, Email */}
            <div className="flex flex-col items-center gap-1 pt-6 pb-3 px-6">
                <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&w=256&q=60"
                    alt="profile"
                    className="rounded-full border-4 border-white shadow-xl w-[92px] h-[92px] object-cover mb-2"
                />
                <div className="font-bold text-white text-xl tracking-wide">{fields.fullName}</div>
                <div className="text-blue-100 text-base">{fields.email}</div>
            </div>

            {/* Editable Info Block */}
            <div className="w-full flex flex-col gap-3 px-5 sm:px-7 pt-4 pb-6 mt-2 rounded-b-2xl">
                <label className="text-sm text-blue-200 font-light mb-0.5">Name</label>
                <input
                    type="text"
                    name="fullName"
                    disabled={!editing}
                    className={`w-full px-4 py-2 mb-1 rounded border-none text-white font-semibold focus:outline-none ${editing ? 'ring-2 ring-blue-400' : ''}`}
                    value={fields.fullName}
                    onChange={handleChange}
                />

                <label className="text-sm text-blue-200 font-light mb-0.5">Email</label>
                <input
                    type="email"
                    name="email"
                    disabled={!editing}
                    className={`w-full px-4 py-2 mb-1 rounded border-none text-white font-semibold focus:outline-none ${editing ? 'ring-2 ring-blue-400' : ''}`}
                    value={fields.email}
                    onChange={handleChange}
                />

                <label className="text-sm text-blue-200 font-light mb-0.5">Number</label>
                <input
                    type="text"
                    name="number"
                    disabled={!editing}
                    className={`w-full px-4 py-2 mb-1 rounded border-none text-white font-semibold focus:outline-none ${editing ? 'ring-2 ring-blue-400' : ''}`}
                    value={fields.number}
                    onChange={handleChange}
                />

                <label className="text-sm text-blue-200 font-light mb-0.5">City</label>
                <input
                    type="text"
                    name="city"
                    disabled={!editing}
                    className={`w-full px-4 py-2 rounded border-none text-white font-semibold focus:outline-none ${editing ? 'ring-2 ring-blue-400' : ''}`}
                    value={fields.city}
                    onChange={handleChange}
                />

                <div className="flex justify-between mt-4">
                    <button
                        className={`px-6 py-2 rounded-lg font-bold tracking-wide transition-all ${editing ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-400 hover:bg-blue-500"} text-white shadow`}
                        onClick={handleUpdate}
                    >
                        {editing ? "Save" : "Update"}
                    </button>

                    <button
                        className="px-6 py-2 rounded-lg font-bold tracking-wide bg-red-500 hover:bg-red-600 text-white shadow"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default ProfileCard;
