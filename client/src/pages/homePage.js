import React from "react";
import HeroImageComponent from "../components/HeroImage/heroImage";
import NavMenuComponent from "../components/NavMenu/navMenu";
import FeaturedProductsComponent from "../components/FeaturedProducts/featuredProducts";

const HomePage = () => {
    return (
        <div className="home-page">
            <HeroImageComponent />
            <NavMenuComponent />
            <FeaturedProductsComponent />
        </div>
    );
}

export default HomePage;
