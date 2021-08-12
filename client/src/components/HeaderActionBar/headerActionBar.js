import React from 'react';
import "./headerActionBar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import WbSunny from "@material-ui/icons/WbSunny";
import ListItemText from "@material-ui/core/ListItemText";
import {Link} from "react-router-dom";


export default class HeaderActionBarComponent extends React.Component {
    render() {


        return (
            <div className='page-header-actions'>
                <div className='header-action-cart'>
                    <FontAwesomeIcon className="header-action-icon" icon={faShoppingCart} />
                </div>
                <div className='header-action-user'>
                    <FontAwesomeIcon className="header-action-icon" icon={faUser} />
                </div>
                <ListItem button key={'weather'}>
                    <ListItemText primary={<Link to="/weather">Weather</Link>} />
                </ListItem>
            </div>
        )
    }
}