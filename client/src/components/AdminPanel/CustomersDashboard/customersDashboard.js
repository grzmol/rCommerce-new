import React from 'react';

import { withTranslation } from 'react-i18next';



const CustomersDashboardComponent = (props) => {
    const { t } = props;
    return (
        <div className={'customers-dashboard'}>
            customersDashboard
        </div>
    );
}
export default withTranslation()(CustomersDashboardComponent);