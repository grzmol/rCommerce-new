import React from "react";
import HeroImageComponent from "../components/HeroImage/heroImage";
import NavMenuComponent from "../components/NavMenu/navMenu";
import FeaturedProductsComponent from "../components/FeaturedProducts/featuredProducts";

import AuthService from "../services/authService";
import LastViewedProductsComponent from "../components/LastViewedProducts/lastViewedProducts";
import AuthWrapper from "../components/authWrapper";

const HomePage = () => {
    const auth = new AuthService();
    return (
        <div className="home-page">
            <HeroImageComponent />
            <NavMenuComponent />
            <FeaturedProductsComponent currentUser={auth.getProfile()} />
            <LastViewedProductsComponent />
        </div>
    );
}

export default AuthWrapper(HomePage);
