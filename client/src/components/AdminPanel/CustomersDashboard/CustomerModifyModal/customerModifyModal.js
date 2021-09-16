import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import {withTranslation} from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import {Checkbox, FormControlLabel, FormGroup, TextField} from "@material-ui/core";
import _ from 'lodash';
import axios from "axios";
import "./customerModifyModal.css";

const CustomerModifyModalComponent = (props) => {
    const {t} = props;
    const [userData, setUserData] = React.useState({});


    useEffect(() => {
        if(!_.isEmpty(props.userData)){
            setUserData(props.userData);
        }
    }, [props.userData]);

    const saveUpdatedUserData = (event) => {
        event.preventDefault();

        axios.post('/api/users/update', userData).then(resp => {
            if (resp.status === 200) {
                props.fetchAction();
                props.closeModal();
            }
        })
    }

    const handleCheckboxChange = (event) => {
        let currentTarget = event.target;
        let inputName = currentTarget.getAttribute('name')

        setUserData({...userData, [inputName]: currentTarget.checked });
    }
    return (
        <div className={'categories-dashboard_header'}>
            <Modal
                open={props.open}
                onClose={props.closeModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Paper className={'customer-modify-modal'}>
                    <div className={'customer-modify-content'}>
                        <h2>{t('CategoryDashboard_NewItem')}</h2>
                        <form id="customer-modify-modal" action="POST" onSubmit={saveUpdatedUserData}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox name="isActive" checked={ Boolean(userData.isActive) } onChange={handleCheckboxChange} />} label={t('User_IsActive')}/>
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox name="isAdmin" checked={ Boolean(userData.isAdmin) } onChange={handleCheckboxChange} />} label={t('User_IsAdmin')} />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12} style={{textAlign: 'center'}}>
                                    <Button type="submit" variant="contained" color="primary">
                                        {t('EditModal_Save')}
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
export default withTranslation()(CustomerModifyModalComponent);