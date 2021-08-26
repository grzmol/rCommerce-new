import React from 'react';

import { withTranslation } from 'react-i18next';

import './adminPanelMenu.css'

import {faFolderOpen, faShoppingBasket, faUsers} from '@fortawesome/free-solid-svg-icons'
import MenuItemComponent from "../MenuItem/menuItem";
import {Divider} from "@material-ui/core";

const AdminPanelMenuComponent = (props) => {
    const { t } = props;
    return (
        <div className={'admin-menu'}>
            <div className={'page-logo'} />
            <Divider/>
            <MenuItemComponent icon={faFolderOpen} name={'Products'} link={'/admin/products'} />
            <MenuItemComponent icon={faShoppingBasket} name={'Orders'} link={'/admin/orders'} />
            <MenuItemComponent icon={faUsers} name={'Customers'} link={'/admin/customers'} />
            <Divider/>

        </div>
    );
}
export default withTranslation()(AdminPanelMenuComponent);