import React from 'react';
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import {withTranslation} from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import {InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import _ from 'lodash';
import axios from "axios";
import LoaderComponent from "../../../Loader/loader";

import './imageDashboardHeader.css';

const ImageDashboardHeaderComponent = (props) => {
    const {t} = props;
    const [open, setOpen] = React.useState(false);
    const [imageData, setImageData] = React.useState({});
    const [dataReady, setDataReady] = React.useState(true);
    const [isImageUploading, setIsImageUploading] = React.useState(false);
    const [type, setType] = React.useState('promo');
    const [product, setProduct] = React.useState('');

    const openModal = () => {
        setOpen(true);
    }
    const closeModal = () => {
        setOpen(false);
    };

    const saveImage = (event) => {
        event.preventDefault();
        setDataReady(false);

        setImageData(_.extend(imageData, {
            'type': type,
            'product': product
        }));

        axios.post('/api/image', imageData).then(resp => {
            setDataReady(true);
            if(resp.status === 200){
                props.fetchAction();
                closeModal();
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleInputChange = (event) => {
        let currentTarget = event.target;
        let inputName = currentTarget.getAttribute('name')

        setImageData(_.extend(imageData, {
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

                setImageData(_.extend(imageData, {
                    imgBase64: data
                }));
            }
        );
    }

    const handleTypeChange = (event) => {
        let typeInput = event.target.value;

        setType(typeInput);
        if(typeInput === "product" && props.products && props.products.length > 0){
            setProduct(props.products[0].productCode);
        }else{
            setProduct('');
        }

    };
    const handleProductChange = (event) => {
        setProduct(event.target.value);
    };




    return (
        <div className={'image-dashboard_header'}>
            <Button variant="contained" color="primary" onClick={openModal}>{t('ImageDashboard_NewItem')}</Button>
            <Modal
                open={open}
                onClose={closeModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Paper className={'new-image-modal'}>
                    <div style={{display: dataReady ? 'none' : 'false'}}>
                        <LoaderComponent />
                    </div>
                    <div className={'product-modal-content'} style={{opacity: dataReady ? '100' : '0'}}>
                        <h2>{t('ImageDashboard_NewItem')}</h2>
                        <form id="new-product-form" action="POST" onSubmit={saveImage}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <label htmlFor="img">{t('ProductModal_SelectImage')}&nbsp;&nbsp;</label>
                                    <input type="file" id="img" name="img" accept="image/*" onChange={handleImageChange}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <InputLabel id="demo-simple-select-label">{t('ImageTable_Type')}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={type}
                                        onChange={handleTypeChange}
                                        variant={'outlined'}
                                        fullWidth
                                    >
                                        <MenuItem value={'promo'} selected={true}>{t('ImageType_Promo')}</MenuItem>
                                        <MenuItem value={'product'}>{t('ImageType_Product')}</MenuItem>
                                    </Select>
                                </Grid>
                                { type === "product" && <Grid item xs={6}>
                                        <InputLabel id="demo-simple-select-label">{t('ImageType_Product')}</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={product}
                                            onChange={handleProductChange}
                                            variant={'outlined'}
                                            fullWidth
                                        >
                                            {
                                                props.products.map(item => <MenuItem value={item.productCode}>{item.name}</MenuItem>)
                                            }
                                        </Select>
                                    </Grid>
                                }
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
                                <Grid item xs={12} style={{textAlign: 'center'}}>
                                    <Button type="submit" variant="contained" color="primary">
                                        {t('ImageDashboard_AddImage')}
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
export default withTranslation()(ImageDashboardHeaderComponent);