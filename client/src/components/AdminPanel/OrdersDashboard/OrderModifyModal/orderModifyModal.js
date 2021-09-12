import React, {useEffect} from 'react';
import _ from "lodash";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";

import {withTranslation} from "react-i18next";

const OrderModifyModalComponent = (props) => {
    const {t} = props;
    const [orderData, setOrderData] = React.useState({});
    const [status, setStatus] = React.useState('');


    useEffect(() => {
        if(!_.isEmpty(props.itemData) && props.itemData.status){
            setStatus(props.itemData.status);
            setOrderData(props.itemData);
        }
    }, [props.itemData]);



    const saveOrder = (event) => {
        event.preventDefault();
        let order = {
            _id: orderData._id,
            status: status
        }
        axios.post('/api/order/update', order).then(resp => {
            if (resp.status === 200) {
                props.fetchAction();
                props.closeModal();
            }
        })
    }
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }

    return (
        <Modal
            open={props.open}
            onClose={props.closeModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Paper className={'new-category-modal'}>
                <div className={'order-modal-content'}>
                    <h2>{t('Orders_EditStatus')}</h2>
                    <form id="edit-order-form" action="POST" onSubmit={saveOrder}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputLabel id="demo-simple-select-label">{t('ProductTable_Category')}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    onChange={handleStatusChange}
                                    variant={'outlined'}
                                    fullWidth
                                >
                                    <MenuItem value="Placed">{t('OrderStatus_Placed')}</MenuItem>
                                    <MenuItem value="InPreparation">{t('OrderStatus_InPreparation')}</MenuItem>
                                    <MenuItem value="ReadyForShipping">{t('OrderStatus_ReadyForShipping')}</MenuItem>
                                    <MenuItem value="Sent">{t('OrderStatus_Sent')}</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} style={{textAlign: 'center'}}>
                                <Button type="submit" variant="contained" color="primary">
                                    {t('CartPage_Update')}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Paper>
        </Modal>
    )
}

export default withTranslation()(OrderModifyModalComponent);