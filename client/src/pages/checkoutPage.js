import React from "react";
import AuthWrapper from "../components/authWrapper";
import AuthService from "../services/authService";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

import stripeConfig from '../config/stripeConfig'
import CheckoutComponent from "../components/Checkout/checkout";

const stripePromise = loadStripe(stripeConfig.STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
    const auth = new AuthService();

    return (
        <div>
            {console.log('stripePromise', stripePromise)}
            <Elements stripe={stripePromise}>
                <CheckoutComponent />
            </Elements>
        </div>
    );
}

export default AuthWrapper(CheckoutPage);

