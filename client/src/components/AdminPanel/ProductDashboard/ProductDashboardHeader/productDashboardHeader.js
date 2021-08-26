import React from 'react';

import { withTranslation } from 'react-i18next';



const ProductDashboardHeaderComponent = (props) => {
    const { t } = props;
    return (
        <div className={'product-dashboard_header'}>
            productDashboardHeader
        </div>
    );
}
export default withTranslation()(ProductDashboardHeaderComponent);