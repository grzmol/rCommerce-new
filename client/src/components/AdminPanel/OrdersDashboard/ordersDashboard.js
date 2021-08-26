import React from 'react';

import { withTranslation } from 'react-i18next';



const OrdersDashboardComponent = (props) => {
    const { t } = props;
    return (
        <div className={'orders-dashboard'}>
            ordersDashboard
        </div>
    );
}
export default withTranslation()(OrdersDashboardComponent);