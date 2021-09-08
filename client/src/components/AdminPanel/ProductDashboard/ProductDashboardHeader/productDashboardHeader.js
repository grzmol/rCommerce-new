import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import {withTranslation} from 'react-i18next';


import './productDashboardHeader.css';
import ProductModifyModalComponent from "../ProductModifyModal/productModifyModal";


const ProductDashboardHeaderComponent = (props) => {
    const {t} = props;
    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    }
    const openModal = () => {
        setModalOpen(true);
    }
    return (
        <div className={'product-dashboard_header'}>
            <Button variant="contained" color="primary" onClick={openModal}>{t('ProductDashboard_NewProduct')}</Button>
            <ProductModifyModalComponent open={modalOpen} fetchAction={props.fetchData} productId="" isEdit={false}
                                         closeModal={closeModal}/>
        </div>
    );
}
export default withTranslation()(ProductDashboardHeaderComponent);