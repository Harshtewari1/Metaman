import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Profile from "../pages/ProfilePage";
import About from "../pages/About";
import ProductDetail from "../pages/ProductDetail";
import CheckoutForm from "../pages/CheckOutForm";
import PrivateRoute from "../components/PrivateRoute";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected Routes */}
            <Route path="/products" element={
                <PrivateRoute>
                    <Products />
                </PrivateRoute>
            } />
            <Route path="/product/:id" element={
                <PrivateRoute>
                    <ProductDetail />
                </PrivateRoute>
            } />
            <Route path="/profile" element={
                <PrivateRoute>
                    <Profile />
                </PrivateRoute>
            } />
            <Route path="/about" element={
                <PrivateRoute>
                    <About />
                </PrivateRoute>
            } />
            <Route path="/checkOutForm" element={
                <PrivateRoute>
                    <CheckoutForm />
                </PrivateRoute>
            } />
        </Routes>
    );
}
export default AppRoutes;