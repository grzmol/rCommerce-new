import React, {useEffect, useState} from 'react';
import "./header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import HeaderActionBarComponent from "../HeaderActionBar/headerActionBar";
import HamburgerMenuComponent from "../HamburgerMenu/hamburgerMenu";
import _ from 'lodash';

const HeaderComponent = (props) => {
    const [backgroundClass, setBackgroundClass] = useState('');
    const [menuOpenClass, setMenuOpenClass] = useState('');


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
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

    return (

        <div className={'page-header-component ' + menuOpenClass} style={{display: displayHeader() ? 'block' : 'none'}}>

            <HamburgerMenuComponent />
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
                    {console.log('sxsss', props)}
                    <HeaderActionBarComponent isLoggedIn={props.isLoggedIn} logoutAction={props.history.logout}/>
                </div>
            </div>
        </div>

    );
}

export default HeaderComponent;