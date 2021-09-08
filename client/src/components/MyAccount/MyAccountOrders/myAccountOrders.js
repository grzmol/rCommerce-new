import React, {useEffect, useState} from 'react'
import MaterialTable from 'material-table'
import {withTranslation} from 'react-i18next';
import {getTranslation} from '../../../locales/materialTable';
import axios from "axios";
import _ from "lodash";
import AuthService from "../../../services/authService";
import OrderDetailsComponent from "./OrderDetails/orderDetails";

const auth = new AuthService();
const currentUser = auth.getProfile();

const MyAccountOrdersComponent = (props) => {
    const { t } = props;
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if(orders.length === 0){
            axios.post('/api/order/', {user: currentUser.username}).then(resp => {
                if(resp.status === 200){
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
                    { title: t('MyOrders_OrderId'), field: '_id' },
                    { title: t('MyOrders_OrderStatus'), field: 'status', render: rowData => t('OrderStatus_' + rowData.status)},
                    { title: t('MyOrders_OrderQuantity'), field: 'totalQuantity' },
                    { title: t('MyOrders_Total'), field: 'totalPrice', render: rowData => rowData.totalPrice + " PLN"},
                    { title: t('MyOrders_Date'), field: 'date' }
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

export default withTranslation()(MyAccountOrdersComponent);