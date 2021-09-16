import React, {useEffect, useState} from 'react'
import MaterialTable from 'material-table'
import {withTranslation} from 'react-i18next';
import {getTranslation} from '../../../locales/materialTable';
import axios from "axios";
import CustomerModifyModalComponent from "./CustomerModifyModal/customerModifyModal";
import _ from "lodash";
import {Checkbox} from "@material-ui/core";

const OrdersDashboardListComponent = (props) => {
    const {t} = props;
    const [users, setUsers] = useState([]);
    const [itemData, setItemData] = useState({});
    const [modalOpen, setModalOpen] = useState(false);

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
    const fetchAction = () => {
        axios.get('/api/users/').then(resp => {
            if (resp.status === 200) {
                setUsers(resp.data);
            }
        })
    }
    useEffect(() => {
        if (users.length === 0) {
            fetchAction();
        }
    })

    return (
        <div>
            <MaterialTable
                title={t('MyAccount_Orders')}
                columns={[
                    {title: t('Username'), field: 'username'},
                    {title: t('Email'), field: 'email'},
                    {title: t('User_IsActive'), field: 'isActive', render: item => <Checkbox disabled checked={Boolean(item.isActive)} />},
                    {title: t('User_IsAdmin'), field: 'isAdmin', render: item => <Checkbox disabled checked={Boolean(item.isAdmin)} />}
                ]}
                data={users}
                localization={getTranslation()}
                actions={[
                    {
                        tooltip: t('Table_EditTooltip'),
                        icon: 'edit',
                        onClick: (event, rowData)=>{
                            openModal(rowData);
                            console.log('rowData', rowData)
                        }
                    }
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
            />
            <CustomerModifyModalComponent open={modalOpen} fetchAction={fetchAction} userData={itemData}
                                          isEdit={true} closeModal={closeModal} />
        </div>
    )
};

export default withTranslation()(OrdersDashboardListComponent);