import React from 'react';
import MenuItemComponent from "../../MenuItem/menuItem";
import {faShippingFast, faUser} from "@fortawesome/free-solid-svg-icons";

const MyAccountNavComponent = (props) => {

    return (
        <div className={'myaccount-navigation'}>
            <MenuItemComponent icon={faUser} name={'MyAccount_Information'} link={'/account/information'} />
            <MenuItemComponent icon={faShippingFast} name={'MyAccount_Orders'} link={'/account/orders'} />
        </div>
    );
};
export default MyAccountNavComponent;