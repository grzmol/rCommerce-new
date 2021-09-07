import React, {useEffect, useState} from 'react';
import "./header.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import HeaderActionBarComponent from "../HeaderActionBar/headerActionBar";
import HeaderMenuComponent from "../HeaderMenu/headerMenu";
import _ from 'lodash';
import {Link} from "react-router-dom";

import {connect} from 'react-redux'
import {fetchCart} from "../../actions/cartActions";
import {Backdrop, CircularProgress} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import {withTranslation} from "react-i18next";
import { withRouter } from 'react-router-dom';

const HeaderComponent = ({history, ...props}) => {
    const [backgroundClass, setBackgroundClass] = useState('');
    const [menuOpenClass, setMenuOpenClass] = useState('');
    const [historyListenerEnabled, setHistoryListenerEnabled] = useState(false);
    const [initCartFetched, setInitCartFetched] = useState(false);
    const {t} = props;

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        if(!initCartFetched){
            setInitCartFetched(true);
            props.fetchCart();
        }
    });

    if(!historyListenerEnabled){
        history.listen(() => {
            props.fetchCart();
        });
        setHistoryListenerEnabled(true);
    }

    const handleScroll = () => {
        if (window.pageYOffset > 0) {
            if(!backgroundClass){
                setBackgroundClass('header-dark-background');
            }
        }else{
            if(backgroundClass){
                setBackgroundClass('');
            }
        }
    }

    const toggleHamburgerMenu = () => {
        if(menuOpenClass === ''){
            setMenuOpenClass('hamburger-menu__open');
        }else{
            setMenuOpenClass('');
        }

    }

    const displayHeader = () => {
        let pagesWithoutHeader = props.pagesWithoutHeader;
        let pathname = window.location.pathname;
        let result = true;

        _.each(pagesWithoutHeader, (item) => {
            if(pathname.indexOf(item) !== -1){
                result = false;
            }
        })
        return result;
    }
    const addToCartMessageStyle = {
        position: 'fixed',
        top: '85px',
        right: props.showAddToMessage ? '20px' : '-500px',
        transition: 'right 1s',
        zIndex: 5
    }
    const backdropStyle = {
        zIndex: 6,
        color: '#fff'
    }
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} style={addToCartMessageStyle}/>;
    }

    return (

        <div className={'page-header-component ' + menuOpenClass} style={{display: displayHeader() ? 'block' : 'none'}}>

            <div className={'page-header ' + backgroundClass}>
                <div className="page-header-section-left">
                    <div className="hamburger-menu-open">
                        <FontAwesomeIcon className="hamburger-menu-icon" icon={faBars} onClick={toggleHamburgerMenu}/>
                    </div>
                </div>
                <div className="page-header-section-center">
                    <Link to="/">
                        <div className="page-logo"/>
                    </Link>
                </div>
                <div className="page-header-section-right">
                    <HeaderActionBarComponent isLoggedIn={props.isLoggedIn} userCart={props.cart} logoutAction={history.logout}/>
                </div>
            </div>
            <HeaderMenuComponent />
            <Alert severity="success">{t('AddToCart_Success')}</Alert>
            <Backdrop style={backdropStyle} open={props.fetching}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>

    );
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        user: state.user,
        error: state.error,
        fetching: state.fetching,
        showAddToMessage: state.showAddToMessage
    }
}
function mapDispatchToProps(dispatch){
    return {
        fetchCart: ()=> dispatch(fetchCart())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(HeaderComponent)));