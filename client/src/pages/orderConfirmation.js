import React from "react";
import AuthService from "../services/authService";
import AuthWrapper from "../components/authWrapper";
import OrderConfirmationComponent from "../components/OrderConfirmation/orderConfirmation";

let authService = new AuthService();
const OrderConfirmationPage = (props) => {
    return (
        <div className="order-confirmation">
            <OrderConfirmationComponent />
        </div>
    );
}

export default AuthWrapper(OrderConfirmationPage);
