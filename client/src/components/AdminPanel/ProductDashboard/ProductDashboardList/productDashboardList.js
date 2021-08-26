import React from 'react';

import { withTranslation } from 'react-i18next';



const ProductDashboardListComponent = (props) => {
    const { t } = props;
    return (
        <div className={'product-dashboard_list'}>
            productDashboardList
        </div>
    );
}
export default withTranslation()(ProductDashboardListComponent);