import React from 'react';

import {withTranslation} from 'react-i18next';

import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import './menuItem.css'

const MenuItemComponent = (props) => {
    const {t} = props;
    return (
        <Link className={'menu--item'} to={props.link}>
            {props.icon && <FontAwesomeIcon className="menu-item_icon" onClick={props.logoutAction} icon={props.icon}/>}
            <span>{t(props.name)}</span>
        </Link>
    );
}
export default withTranslation()(MenuItemComponent);