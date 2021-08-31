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

import './categoryDashboardHeader.css';

const CategoryDashboardHeaderComponent = (props) => {
    const {t} = props;
    const [open, setOpen] = React.useState(false);
    const [categoryData, setCategoryData] = React.useState({});
    const [dataReady, setDataReady] = React.useState(true);

    const openModal = () => {
        setOpen(true);
    }
    const closeModal = () => {
        setOpen(false);
    };

    const saveCategory = (event) => {
        event.preventDefault();
        setDataReady(false);
        axios.post('/api/category', categoryData).then(resp => {
            setDataReady(true);
            if(resp.status === 200){
                props.fetchAction();
                closeModal();
            }
        })
    }

    const handleInputChange = (event) => {
        let currentTarget = event.target;
        let inputName = currentTarget.getAttribute('name')

        setCategoryData(_.extend(categoryData, {
            [inputName]: currentTarget.value
        }));
    }

    return (
        <div className={'categories-dashboard_header'}>
            <Button variant="contained" color="primary" onClick={openModal}>{t('CategoryDashboard_NewItem')}</Button>
            <Modal
                open={open}
                onClose={closeModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Paper className={'new-category-modal'}>
                    <div style={{display: dataReady ? 'none' : 'false'}}>
                        <LoaderComponent />
                    </div>
                    <div className={'category-modal-content'} style={{opacity: dataReady ? '100' : '0'}}>
                        <h2>{t('CategoryDashboard_NewItem')}</h2>
                        <form id="new-product-form" action="POST" onSubmit={saveCategory}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField name="name" required id="standard-required" label={t('CategoryTable_Name')}
                                               variant="outlined" fullWidth onInput={handleInputChange}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="desc" required id="standard-required" label={t('CategoryTable_Desc')}
                                               variant="outlined" fullWidth onInput={handleInputChange}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="displayNameEN" required id="standard-required" label={t('CategoryTable_DisplayNamePL')}
                                               variant="outlined" fullWidth onInput={handleInputChange}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="displayNamePL" required id="standard-required" label={t('CategoryTable_DisplayNameEN')}
                                               variant="outlined" fullWidth onInput={handleInputChange}/>
                                </Grid>
                                <Grid item xs={12} style={{textAlign: 'center'}}>
                                    <Button type="submit" variant="contained" color="primary">
                                        {t('CategoryDashboard_AddCategory')}
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
export default withTranslation()(CategoryDashboardHeaderComponent);