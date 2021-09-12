import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import {withTranslation} from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import {TextField} from "@material-ui/core";
import _ from 'lodash';
import axios from "axios";
import LoaderComponent from "../../../Loader/loader";


const CategoryModifyModalComponent = (props) => {
    const {t} = props;
    const [categoryData, setCategoryData] = React.useState({});
    const [dataReady, setDataReady] = React.useState(true);


    useEffect(() => {
        if(!_.isEmpty(props.itemData)){
            setCategoryData(props.itemData);
        }
    }, [props.itemData]);

    const saveCategory = (event) => {
        event.preventDefault();
        setDataReady(false);
        axios.post(props.isEdit ? '/api/category/update' : '/api/category', categoryData).then(resp => {
            setDataReady(true);
            if (resp.status === 200) {
                props.fetchAction();
                props.closeModal();
            }
        })
    }

    const handleInputChange = (event) => {
        let currentTarget = event.target;
        let inputName = currentTarget.getAttribute('name')

        setCategoryData({...categoryData, [inputName]: currentTarget.value })

    }

    return (
        <div className={'categories-dashboard_header'}>
            <Modal
                open={props.open}
                onClose={props.closeModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Paper className={'new-category-modal'}>
                    <div style={{display: dataReady ? 'none' : 'false'}}>
                        <LoaderComponent/>
                    </div>
                    <div className={'category-modal-content'} style={{opacity: dataReady ? '100' : '0'}}>
                        <h2>{t('CategoryDashboard_NewItem')}</h2>
                        <form id="new-product-form" action="POST" onSubmit={saveCategory}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField name="name" required id="standard-required"
                                               label={t('CategoryTable_Name')}
                                               variant="outlined" fullWidth onInput={handleInputChange} value={categoryData.name}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="desc" required id="standard-required"
                                               label={t('CategoryTable_Desc')}
                                               variant="outlined" fullWidth onInput={handleInputChange} value={categoryData.desc}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="displayNamePL" required id="standard-required"
                                               label={t('CategoryTable_DisplayNamePL')}
                                               variant="outlined" fullWidth onInput={handleInputChange} value={categoryData.displayNamePL}/>
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
export default withTranslation()(CategoryModifyModalComponent);