import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import {withTranslation} from 'react-i18next';

import './categoryDashboardHeader.css';
import CategoryModifyModalComponent from "../CategoryModifyModal/categoryModifyModal";

const CategoryDashboardHeaderComponent = (props) => {
    const {t} = props;
    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    }
    const openModal = () => {
        setModalOpen(true);
    }

    return (
        <div className={'categories-dashboard_header'}>
            <Button variant="contained" color="primary" onClick={openModal}>{t('CategoryDashboard_NewItem')}</Button>
            <CategoryModifyModalComponent open={modalOpen} fetchAction={props.fetchAction}
                                          isEdit={false} closeModal={closeModal} />
        </div>
    );
}
export default withTranslation()(CategoryDashboardHeaderComponent);