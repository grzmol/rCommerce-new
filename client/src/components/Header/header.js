import React, {useEffect, useState} from 'react';
import "./header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import HeaderActionBarComponent from "../HeaderActionBar/headerActionBar";

const HeaderComponent = (props) => {
    const [backgroundClass, setBackgroundClass] = useState('');


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

    return (
        <div className={'page-header ' + backgroundClass}>
            <div className="page-header-section-left">
                <div className="hamburger-menu-open">
                    <FontAwesomeIcon className="hamburger-menu-icon" icon={faBars} />
                </div>
            </div>
            <div className="page-header-section-center">
                <div className="page-logo"></div>
            </div>
            <div className="page-header-section-right">
                <HeaderActionBarComponent isLoggedIn={props.isLoggedIn}/>
            </div>
        </div>
    );
}

export default HeaderComponent;