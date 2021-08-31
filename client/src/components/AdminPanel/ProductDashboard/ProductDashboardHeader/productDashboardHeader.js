import React from 'react';
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import {withTranslation} from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import './productDashboardHeader.css';
import {TextField} from "@material-ui/core";
import _ from 'lodash';
import axios from "axios";
import LoaderComponent from "../../../Loader/loader";


const ProductDashboardHeaderComponent = (props) => {
    const {t} = props;
    const [open, setOpen] = React.useState(false);
    const [productData, setProductData] = React.useState({});
    const [isImageUploading, setIsImageUploading] = React.useState(false);
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
        axios.post('/api/product', productData).then(resp => {
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

        setProductData(_.extend(productData, {
            [inputName]: currentTarget.value
        }));
    }

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const handleImageChange = (event) => {
        let file = event.target.files[0];
        setIsImageUploading(true);
        getBase64(file).then(
            data => {
                setIsImageUploading(false);

                setProductData(_.extend(productData, {
                    image: data
                }));
            }
        );
    }

    return (
        <div className={'product-dashboard_header'}>
            <Button variant="contained" color="primary" onClick={openModal}>{t('ProductDashboard_NewProduct')}</Button>
            <Modal
                open={open}
                onClose={closeModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Paper className={'new-product-modal'}>
                    <div style={{display: dataReady ? 'none' : 'false'}}>
                        <LoaderComponent />
                    </div>
                    <div className={'product-modal-content'} style={{opacity: dataReady ? '100' : '0'}}>
                        <h2>{t('ProductDashboard_NewProduct')}</h2>
                        <form id="new-product-form" action="POST" onSubmit={saveProduct}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <label htmlFor="img">{t('ProductModal_SelectImage')}&nbsp;&nbsp;</label>
                                    <input type="file" id="img" name="img" accept="image/*" onChange={handleImageChange}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="name" required id="standard-required" label={t('ProductTable_Name')}
                                               variant="outlined" fullWidth onInput={handleInputChange}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="productCode"  required id="standard-required" label={t('ProductTable_Code')}
                                               variant="outlined" fullWidth onInput={handleInputChange}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="desc"
                                        id="outlined-multiline-static"
                                        label={t('ProductTable_Desc')}
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        fullWidth
                                        onInput={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="price" required id="standard-required" label={t('ProductTable_Price')}
                                               variant="outlined" fullWidth onInput={handleInputChange}/>
                                </Grid>
                                <Grid item xs={12} style={{textAlign: 'center'}}>
                                    <Button type="submit" variant="contained" color="primary" disabled={isImageUploading}>
                                        {t('ProductModal_AddProduct')}
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
export default withTranslation()(ProductDashboardHeaderComponent);