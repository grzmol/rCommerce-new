import React from "react";
import AuthWrapper from "../components/authWrapper";
import OrderConfirmationComponent from "../components/OrderConfirmation/orderConfirmation";

const OrderConfirmationPage = () => {
    return (
        <div className="order-confirmation">
            <OrderConfirmationComponent/>
        </div>
    );
}

export default AuthWrapper(OrderConfirmationPage);
