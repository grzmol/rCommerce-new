import React from 'react';

import {withTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import "./breadcrumb.css";

class BreadcrumbComponent extends React.Component {
    render() {
        const {t} = this.props;
        return (
            <div className="breadcrumb">
                <Link to="/">{t('Breadcrumb_Home')}</Link>
                {
                    this.props.category && (<span>&nbsp;/&nbsp;<Link to={'/category/'+this.props.category}>{this.props.category}</Link></span>)
                }
                {
                    this.props.product && (<span>&nbsp;/&nbsp;<Link to={'/product/'+this.props.product.productCode}>{this.props.product.name}</Link></span>)
                }
            </div>
        )
    }
}

export default withTranslation()(BreadcrumbComponent);