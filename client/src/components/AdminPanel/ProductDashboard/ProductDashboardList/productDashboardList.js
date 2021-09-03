import React, {useState} from 'react'
import MaterialTable from 'material-table'
import {withTranslation} from 'react-i18next';
import {getTranslation} from '../../../../locales/materialTable';
import axios from "axios";
import _ from "lodash";
import ConfirmationDialogComponent from "../../../ConfirmationDialog/confirmationDialog";

const ProductDashboardListComponent = (props) => {
    const { t } = props;

    const [confirmationModal, setConfirmationModal] = useState(false);
    const [productsToRemove, setProductsToRemove] = useState([]);


    const deleteProducts = () => {


        axios.post('/api/product/delete', {idsToRemove: productsToRemove}).then(resp => {
            if(resp.status === 200){
                props.fetchAction();
                closeConfirmationDialog();
            }
        })
    }
    const closeConfirmationDialog = () => {
        setConfirmationModal(false);
    }
    const initRemoveAction = () => {
        setConfirmationModal(true);
    }
    const handleItemSelection = (selectedItems) => {
        let itemsToDelete = [];

        _.each(selectedItems, selectedItem => {
            itemsToDelete.push(selectedItem._id);
        });

        setProductsToRemove(itemsToDelete);
    }

    return (
        <div>
            <MaterialTable
                title={t('MenuItem_Products')}
                columns={[
                    { title: '', field: 'img', render: item => <img src={item.image} alt="" height="100" width="100" />},
                    { title: t('ProductTable_Name'), field: 'name' },
                    { title: t('ProductTable_Category'), field: 'category' },
                    { title: t('ProductTable_IsFeatured'), field: 'isFeatured' },
                    { title: t('ProductTable_Code'), field: 'productCode' },
                    { title: t('ProductTable_Desc'), field: 'desc' },
                    { title: t('ProductTable_Price'), field: 'price', type: 'numeric', render: item => item.price + ' PLN' },
                ]}
                data={props.productList}
                options={{
                    selection: true
                }}
                onSelectionChange={handleItemSelection}
                actions={[
                    {
                        tooltip: t('Table_RemoveTooltip'),
                        icon: 'delete',
                        onClick: initRemoveAction
                    }
                ]}
                localization={getTranslation()}
            />
            <ConfirmationDialogComponent open={confirmationModal} disagree={closeConfirmationDialog} agree={deleteProducts}/>
        </div>
    )
};

export default withTranslation()(ProductDashboardListComponent);