import React from 'react';
import "./headerActionBar.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart, faSignOutAlt, faUser} from '@fortawesome/free-solid-svg-icons'

const HeaderActionBarComponent = (props) => {
    return (
        <div className='page-header-actions'>
            <div className='header-action-cart'>
                <FontAwesomeIcon className="header-action-icon" icon={faShoppingCart} />
            </div>
            <div className='header-action-user'>
                <FontAwesomeIcon className="header-action-icon" icon={faUser} />
            </div>
            <div className='header-action-user' style={{display: props.isLoggedIn ? 'block' : 'none'}}>
                <FontAwesomeIcon className="header-action-icon" icon={faSignOutAlt} />
            </div>
        </div>
    );

}
export default HeaderActionBarComponent;