import React, {useEffect, useState} from 'react';
import "./header.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import HeaderActionBarComponent from "../HeaderActionBar/headerActionBar";
import HeaderMenuComponent from "../HeaderMenu/headerMenu";
import _ from 'lodash';
import axios from "axios";

const HeaderComponent = (props) => {
    const [backgroundClass, setBackgroundClass] = useState('');
    const [menuOpenClass, setMenuOpenClass] = useState('');
    const [userCart, setUserCart] = useState({});

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        if(_.isEmpty(userCart)){
            fetchCart();
        }
    });


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

    const fetchCart = () => {
        axios.post('/api/cart', {user: props.user.username}).then(resp => {
            if (resp.status === 200 && resp.data){
                setUserCart(resp.data);
            }else{
                let cartData = {
                    user: props.user.username,
                }
                axios.post('/api/cart/new', cartData).then(resp => {
                    setUserCart(resp.data);
                });
            }
        });
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

    window.actions = {};
    window.actions.fetchHeaderInfo = fetchCart;

    return (

        <div className={'page-header-component ' + menuOpenClass} style={{display: displayHeader() ? 'block' : 'none'}}>

            <div className={'page-header ' + backgroundClass}>
                <div className="page-header-section-left">
                    <div className="hamburger-menu-open">
                        <FontAwesomeIcon className="hamburger-menu-icon" icon={faBars} onClick={toggleHamburgerMenu}/>
                    </div>
                </div>
                <div className="page-header-section-center">
                    <div className="page-logo"></div>
                </div>
                <div className="page-header-section-right">
                    <HeaderActionBarComponent isLoggedIn={props.isLoggedIn} userCart={userCart} logoutAction={props.history.logout}/>
                </div>
            </div>
            <HeaderMenuComponent />
        </div>

    );
}

export default HeaderComponent;