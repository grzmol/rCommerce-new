import React from "react";
import AuthWrapper from "../components/authWrapper";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

import stripeConfig from '../config/stripeConfig'
import CheckoutComponent from "../components/Checkout/checkout";

const stripePromise = loadStripe(stripeConfig.STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutComponent/>
            </Elements>
        </div>
    );
}

export default AuthWrapper(CheckoutPage);

