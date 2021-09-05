import React from "react";


import AuthService from "../services/authService";
import ProductDetailsComponent from "../components/ProductDetails/productDetails";
import LastViewedProductsComponent from "../components/LastViewedProducts/lastViewedProducts";
const ProductDetailsPage = () => {
    const auth = new AuthService();
    return (
        <div className="product-details-page">
            <ProductDetailsComponent user={auth.getProfile()}/>
        </div>
    );
}

export default ProductDetailsPage;
