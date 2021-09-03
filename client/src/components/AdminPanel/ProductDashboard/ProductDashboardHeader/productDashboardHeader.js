import React from 'react';
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import {withTranslation} from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import './productDashboardHeader.css';
import {Checkbox, FormControlLabel, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import _ from 'lodash';
import axios from "axios";
import LoaderComponent from "../../../Loader/loader";


const ProductDashboardHeaderComponent = (props) => {
    const {t} = props;
    const [open, setOpen] = React.useState(false);
    const [productData, setProductData] = React.useState({});
    const [isImageUploading, setIsImageUploading] = React.useState(false);
    const [dataReady, setDataReady] = React.useState(true);
    const [isFeatured, setIsFeatured] = React.useState(true);
    const [category, setCategory] = React.useState(props.categories && props.categories.length > 0 ? props.categories[0].name : '');
    const [currPrice, setCurrPrice] = React.useState(1);

    const openModal = () => {
        setOpen(true);
    }
    const closeModal = () => {
        setOpen(false);
    };

    const saveProduct = (event) => {
        event.preventDefault();
        setDataReady(false);
        setProductData(_.extend(productData, {
            category: category,
            isFeatured: isFeatured
        }));
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

    const handleCategoryChange = (event) => {
        let categoryInput = event.target.value;
        setCategory(categoryInput);
    };

    const handleCheckboxChange = (event) => {
        setIsFeatured(event.target.checked);
    };

    const validateAndSaveQty = (event) => {
        let currValue = event.target.value;

        if(_.isNumber(Number(currValue)) && currValue > 0){
            setProductData(_.extend(productData, {
                price: currValue
            }));
            setCurrPrice(currValue);
        }else{
            event.target.value = currPrice;
        }

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
                                    <InputLabel id="demo-simple-select-label">{t('ProductTable_Category')}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={category}
                                        onChange={handleCategoryChange}
                                        variant={'outlined'}
                                        fullWidth
                                    >
                                        {
                                            props.categories.map(item => (<MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>))
                                        }

                                    </Select>
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
                                    <TextField name="price" type="text" data-old="" required id="standard-required" label={t('ProductTable_Price')}
                                               variant="outlined" fullWidth onInput={validateAndSaveQty}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isFeatured}
                                                onChange={handleCheckboxChange}
                                                name="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label={t('ProductTable_IsFeatured')}
                                    />
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