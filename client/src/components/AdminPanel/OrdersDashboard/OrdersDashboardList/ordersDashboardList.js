import React, {useEffect, useState} from 'react'
import MaterialTable from 'material-table'
import {withTranslation} from 'react-i18next';
import {getTranslation} from '../../../../locales/materialTable';
import axios from "axios";
import OrderDetailsComponent from "../../../MyAccount/MyAccountOrders/OrderDetails/orderDetails";

import "./ordersDashboardList.css";
import OrderModifyModalComponent from "../OrderModifyModal/orderModifyModal";
import _ from "lodash";

const OrdersDashboardListComponent = (props) => {
    const {t} = props;
    const [orders, setOrders] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [itemData, setItemData] = useState({});

    const closeModal = () => {
        setModalOpen(false);
    }
    const openModal = (editData) => {
        if(editData && !_.isEmpty(editData)){
            setItemData(editData);
        }else{
            setItemData({});
        }
        setModalOpen(true);
    }

    useEffect(() => {
        if (orders.length === 0) {
            axios.get('/api/order/').then(resp => {
                if (resp.status === 200) {
                    setOrders(resp.data);
                }
            })
        }
    })
    const parseDate = (date) => {
        let theDate = new Date( Date.parse(date));

        return date ? theDate.toLocaleDateString() : '';
    }

    const clearOrders = () => {
        setOrders([]);
    }
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
                    {title: t('MyOrders_Date'), field: 'date', render: rowData => parseDate(rowData.date)}
                ]}
                data={orders}
                localization={getTranslation()}
                detailPanel={rowData => {
                    return (
                        <OrderDetailsComponent rowData={rowData}/>
                    )
                }}
                actions={[
                    {
                        tooltip: t('Table_EditTooltip'),
                        icon: 'edit',
                        onClick: (event, rowData) => {
                            openModal(rowData);
                        }
                    }
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
            />
            <OrderModifyModalComponent open={modalOpen} fetchAction={clearOrders} itemData={itemData}
                                       isEdit={true} closeModal={closeModal}/>
        </div>
    )
};

export default withTranslation()(OrdersDashboardListComponent);