import React, {useState} from 'react'
import MaterialTable from 'material-table'
import {withTranslation} from 'react-i18next';
import {getTranslation} from '../../../../locales/materialTable';
import axios from "axios";
import _ from "lodash";
import ProductModifyModalComponent from "../ProductModifyModal/productModifyModal";

const ProductDashboardListComponent = (props) => {
    const {t} = props;
    const [modalOpen, setModalOpen] = useState(false);
    const [itemData, setItemData] = useState({});

    const closeModal = () => {
        setModalOpen(false);
    }
    const openModal = (editData) => {
        if(editData && !_.isEmpty(editData)){
            setItemData(editData);
        }else{
            setItemData({});
        }
        setModalOpen(true);
    }


    const deleteProducts = (rowData) => {

        if (window.confirm(t('ConfirmationDialog_Text'))) {
            axios.post('/api/product/delete', {idsToRemove: [rowData._id]}).then(resp => {
                if (resp.status === 200) {
                    props.fetchAction();
                }
            })
        }

    }

    return (
        <div>
            <MaterialTable
                title={t('MenuItem_Products')}
                columns={[
                    {title: '', field: 'img', render: item => <img src={item.image} alt="" height="100" width="100"/>},
                    {title: t('ProductTable_Name'), field: 'name'},
                    {title: t('ProductTable_Category'), field: 'category'},
                    {title: t('ProductTable_IsFeatured'), field: 'isFeatured'},
                    {title: t('ProductTable_Code'), field: 'productCode'},
                    {title: t('ProductTable_Desc'), field: 'desc'},
                    {
                        title: t('ProductTable_Price'),
                        field: 'price',
                        type: 'numeric',
                        render: item => item.price + ' PLN'
                    }
                ]}
                data={props.productList}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: t('Edit_Tooltip'),
                        onClick: (event, rowData) => {
                            openModal(rowData);
                        }
                    },
                    {
                        tooltip: t('Table_RemoveTooltip'),
                        icon: 'delete',
                        onClick: (event, rowData) => {
                            deleteProducts(rowData);
                        }
                    },
                ]}
                localization={getTranslation()}
                options={{
                    actionsColumnIndex: -1
                }}
            />

            <ProductModifyModalComponent open={modalOpen} fetchAction={props.fetchAction} itemData={itemData}
                                         isEdit={true} closeModal={closeModal}/>
        </div>
    )
};

export default withTranslation()(ProductDashboardListComponent);