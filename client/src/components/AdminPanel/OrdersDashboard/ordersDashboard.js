import React from 'react';
import OrdersDashboardListComponent from "./OrdersDashboardList/ordersDashboardList";


const OrdersDashboardComponent = (props) => {

    return (
        <div className={'orders-dashboard'}>
            <OrdersDashboardListComponent/>
        </div>
    );
}
export default OrdersDashboardComponent;