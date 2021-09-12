import React from 'react';
import "./footer.css";
import _ from "lodash";

const FooterComponent = (props) => {

    const displayFooter = () => {
        let pagesWithoutFooter = props.pagesWithoutFooter;
        let pathname = window.location.pathname;
        let result = true;

        _.each(pagesWithoutFooter, (item) => {
            if (pathname.indexOf(item) !== -1) {
                result = false;
            }
        })
        return result;
    }

    return (
        <div className="page-footer" style={{display: displayFooter() ? 'block' : 'none'}}>
            <div className="page-footer-main">
            </div>
            <div className="page-footer-bottom-fade">
                <div className="copyright-note">
                </div>
            </div>
        </div>
    )
}

export default FooterComponent;