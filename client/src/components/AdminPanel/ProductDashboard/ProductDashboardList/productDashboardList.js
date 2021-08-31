import React from 'react'
import MaterialTable from 'material-table'
import {withTranslation} from 'react-i18next';
import {getTranslation} from '../../../../locales/materialTable';

const ProductDashboardListComponent = (props) => {
    const { t } = props;

    return (
        <MaterialTable
            title={t('MenuItem_Products')}
            columns={[
                { title: '', field: 'img', render: item => <img src={item.image} alt="" border="3" height="100" width="100" />},
                { title: t('ProductTable_Name'), field: 'name' },
                { title: t('ProductTable_Code'), field: 'productCode' },
                { title: t('ProductTable_Desc'), field: 'desc' },
                { title: t('ProductTable_Price'), field: 'price', type: 'numeric', render: item => item.price + ' PLN' },
            ]}
            data={props.productList}
            options={{
                selection: true
            }}
            actions={[
                {
                    tooltip: t('Table_RemoveTooltip'),
                    icon: 'delete',
                    onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
                }
            ]}
            localization={getTranslation()}
        />
    )
};

export default withTranslation()(ProductDashboardListComponent);