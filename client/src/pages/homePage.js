import React from "react";
import HeroImageComponent from "../components/HeroImage/heroImage";
import NavMenuComponent from "../components/NavMenu/navMenu";
import FeaturedProductsComponent from "../components/FeaturedProducts/featuredProducts";

import AuthService from "../services/authService";
const HomePage = () => {
    const auth = new AuthService();
    return (
        <div className="home-page">
            <HeroImageComponent />
            <NavMenuComponent />
            <FeaturedProductsComponent currentUser={auth.getProfile()} />
        </div>
    );
}

export default HomePage;
