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

const MenuDashboardHeaderComponent = (props) => {
    const {t} = props;
    const [open, setOpen] = React.useState(false);
    const [menuData, setMenuData] = React.useState({});
    const [dataReady, setDataReady] = React.useState(true);

    const openModal = () => {
        setOpen(true);
    }
    const closeModal = () => {
        setOpen(false);
    };

    const saveProduct = (event) => {
        event.preventDefault();
        setDataReady(false);
        axios.post('/api/menu', menuData).then(resp => {
            setDataReady(true);
            if (resp.status === 200) {
                props.fetchAction();
                closeModal();
            }
        })
    }

    const handleInputChange = (event) => {
        let currentTarget = event.target;
        let inputName = currentTarget.getAttribute('name')

        setMenuData(_.extend(menuData, {
            [inputName]: currentTarget.value
        }));
    }

    return (
        <div className={'menu-dashboard_header'}>
            <Button variant="contained" color="primary" onClick={openModal}>{t('MenuDashboard_NewItem')}</Button>
            <Modal
                open={open}
                onClose={closeModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Paper className={'new-menu-modal'}>
                    <div style={{display: dataReady ? 'none' : 'false'}}>
                        <LoaderComponent/>
                    </div>
                    <div className={'product-modal-content'} style={{opacity: dataReady ? '100' : '0'}}>
                        <h2>{t('MenuDashboard_NewItem')}</h2>
                        <form id="new-product-form" action="POST" onSubmit={saveProduct}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField name="name" required id="standard-required" label={t('MenuTable_Name')}
                                               variant="outlined" fullWidth onInput={handleInputChange}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="url" required id="standard-required" label={t('MenuTable_LinkURL')}
                                               variant="outlined" fullWidth onInput={handleInputChange}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="displayNamePL" required id="standard-required"
                                               label={t('MenuTable_DisplayNamePL')}
                                               variant="outlined" fullWidth onInput={handleInputChange}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="displayNameEN" required id="standard-required"
                                               label={t('MenuTable_DisplayNameEN')}
                                               variant="outlined" fullWidth onInput={handleInputChange}/>
                                </Grid>
                                <Grid item xs={12} style={{textAlign: 'center'}}>
                                    <Button type="submit" variant="contained" color="primary">
                                        {t('MenuDashboard_AddMenuItem')}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Paper>
            </Modal>
        </div>
    );
}
export default withTranslation()(MenuDashboardHeaderComponent);