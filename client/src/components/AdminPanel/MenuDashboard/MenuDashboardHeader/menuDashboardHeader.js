import React from 'react';
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import {withTranslation} from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import {TextField} from "@material-ui/core";
import _ from 'lodash';
import axios from "axios";
import LoaderComponent from "../../../Loader/loader";

import './menuDashboardHeader.css';
import ModifyMenuModalComponent from "../ModifyMenuModal/modifyMenuModal";

const MenuDashboardHeaderComponent = (props) => {
    const {t} = props;
    const [open, setOpen] = React.useState(false);

    const openModal = () => {
        setOpen(true);
    }
    const closeModal = () => {
        setOpen(false);
    };
    return (
        <div className={'menu-dashboard_header'}>
            <Button variant="contained" color="primary" onClick={openModal}>{t('MenuDashboard_NewItem')}</Button>
            <ModifyMenuModalComponent open={open} fetchAction={props.fetchAction}
                                      isEdit={false} closeModal={closeModal} />
        </div>
    );
}
export default withTranslation()(MenuDashboardHeaderComponent);