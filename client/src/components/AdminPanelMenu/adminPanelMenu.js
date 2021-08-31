import React from 'react';

import './adminPanelMenu.css'

import {faBars, faBoxes, faFolderOpen, faShoppingBasket, faUsers} from '@fortawesome/free-solid-svg-icons'
import MenuItemComponent from "../MenuItem/menuItem";
import {Divider} from "@material-ui/core";

const AdminPanelMenuComponent = (props) => {
    return (
        <div className={'admin-menu'}>
            <div className={'page-logo'} />
            <Divider/>
            <MenuItemComponent icon={faBoxes} name={'MenuItem_Products'} link={'/admin/products'} />
            <MenuItemComponent icon={faFolderOpen} name={'MenuItem_Categories'} link={'/admin/category'} />
            <MenuItemComponent icon={faShoppingBasket} name={'MenuItem_Orders'} link={'/admin/orders'} />
            <MenuItemComponent icon={faUsers} name={'MenuItem_Customers'} link={'/admin/customers'} />
            <MenuItemComponent icon={faBars} name={'MenuItem_Menu'} link={'/admin/menu'} />
            <Divider/>

        </div>
    );
}
export default AdminPanelMenuComponent;