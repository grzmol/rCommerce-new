import React from "react";
import AuthWrapper from "../components/authWrapper";
import CartComponent from "../components/Cart/cart";
import FeaturedProductsComponent from "../components/FeaturedProducts/featuredProducts";
import AuthService from "../services/authService";

const CartPage = () => {
    const auth = new AuthService();
    return (
        <div>
            <CartComponent/>
            <FeaturedProductsComponent currentUser={auth.getProfile()}/>
        </div>
    );
}

export default AuthWrapper(CartPage);
