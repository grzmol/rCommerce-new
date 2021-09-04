import React from 'react';
import "./headerActionBar.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart, faSignInAlt, faSignOutAlt, faUser} from '@fortawesome/free-solid-svg-icons'
import {withRouter} from 'react-router-dom';
import {Badge} from "@material-ui/core";


const HeaderActionBarComponent = ({history, ...props}) => {

    return (
        <div className='page-header-actions'>
            <div className='header-action-cart'>
                <Badge badgeContent={props.userCart.totalQuantity} color="secondary">
                    <FontAwesomeIcon className="header-action-icon" onClick={() => history.push('/cart')} icon={faShoppingCart} />
                </Badge>
            </div>
            <div className='header-action-user'>
                <FontAwesomeIcon className="header-action-icon" onClick={() => history.push('/account')} icon={faUser} />
            </div>
            {   props.isLoggedIn ?
                <div className='header-action-logout'>
                    <FontAwesomeIcon className="header-action-icon" onClick={props.logoutAction} icon={faSignOutAlt} />
                </div> :
                <div className='header-action-login'>
                    <FontAwesomeIcon className="header-action-icon" onClick={() => history.push('/login')} icon={faSignInAlt} />
                </div>
            }
        </div>
    );

}
export default withRouter(HeaderActionBarComponent);