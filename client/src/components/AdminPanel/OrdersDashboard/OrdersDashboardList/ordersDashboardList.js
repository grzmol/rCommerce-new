import React, {useEffect, useState} from 'react'
import MaterialTable from 'material-table'
import {withTranslation} from 'react-i18next';
import {getTranslation} from '../../../../locales/materialTable';
import axios from "axios";
import OrderDetailsComponent from "../../../MyAccount/MyAccountOrders/OrderDetails/orderDetails";


const OrdersDashboardListComponent = (props) => {
    const {t} = props;
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (orders.length === 0) {
            axios.get('/api/order/').then(resp => {
                if (resp.status === 200) {
                    setOrders(resp.data);
                }
            })
        }
    })

    return (
        <div>
            <MaterialTable
                title={t('MyAccount_Orders')}
                columns={[
                    {title: t('MyOrders_OrderId'), field: '_id'},
                    {title: t('OrdersDashboard_User'), field: 'user'},
                    {
                        title: t('MyOrders_OrderStatus'),
                        field: 'status',
                        render: rowData => t('OrderStatus_' + rowData.status)
                    },
                    {title: t('MyOrders_OrderQuantity'), field: 'totalQuantity'},
                    {title: t('MyOrders_Total'), field: 'totalPrice', render: rowData => rowData.totalPrice + " PLN"},
                    {title: t('MyOrders_Date'), field: 'date'}
                ]}
                data={orders}
                localization={getTranslation()}
                detailPanel={rowData => {
                    return (
                        <OrderDetailsComponent rowData={rowData}/>
                    )
                }}
            />
        </div>
    )
};

export default withTranslation()(OrdersDashboardListComponent);