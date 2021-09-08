import React, {useEffect, useState} from 'react'
import MaterialTable from 'material-table'
import {withTranslation} from 'react-i18next';
import {getTranslation} from '../../../locales/materialTable';
import axios from "axios";

const OrdersDashboardListComponent = (props) => {
    const {t} = props;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (users.length === 0) {
            axios.get('/api/users/').then(resp => {
                if (resp.status === 200) {
                    setUsers(resp.data);
                }
            })
        }
    })

    return (
        <div>
            <MaterialTable
                title={t('MyAccount_Orders')}
                columns={[
                    {title: t('Username'), field: 'username'},
                    {title: t('Email'), field: 'email'},
                    {title: t('User_IsActive'), field: 'isActive'},
                    {title: t('User_IsAdmin'), field: 'isAdmin'}
                ]}
                data={users}
                localization={getTranslation()}
            />
        </div>
    )
};

export default withTranslation()(OrdersDashboardListComponent);