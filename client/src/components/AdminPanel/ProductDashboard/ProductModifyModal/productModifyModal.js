import React, {useEffect, useState} from 'react';
import _ from "lodash";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {Checkbox, FormControlLabel, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";

import {withTranslation} from "react-i18next";
import {loadingOff, loadingOn} from "../../../../actions/cartActions";
import {connect} from "react-redux";

const ProductModifyModalComponent = (props) => {
    const {t} = props;

    const [productData, setProductData] = useState({});
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [isFeatured, setIsFeatured] = useState(true);
    const [category, setCategory] = useState({});
    const [categories, setCategories] = useState([]);
    const [currPrice, setCurrPrice] = useState(1);

    const editProductData = props.itemData || {};
    const [fetchingCategory, setFetchingCategory] = useState(false);

    useEffect(() => {
        if (!_.isEmpty(editProductData)) {
            setProductData(editProductData);
            setIsFeatured(editProductData.isFeatured);
            setCategory(editProductData.category);
            setCurrPrice(editProductData.price);
        }

    }, [props.itemData])


    useEffect(() => {
        if (_.isEmpty(category) && !fetchingCategory) {
            setFetchingCategory(true);
            axios.get('/api/category').then(resp => {
                if (resp.status === 200) {
                    setCategories(resp.data);
                    setCategory(resp.data.length > 0 ? resp.data[0].name : '')
                }
            })
        }
    })


    const saveProduct = (event) => {
        event.preventDefault();
        setProductData(_.extend(productData, {
            category: category,
            isFeatured: isFeatured
        }));
        props.loadingOn();
        axios.post(props.isEdit ? '/api/product/update' : '/api/product', productData).then(resp => {
            if (resp.status === 200) {
                props.loadingOff();
                props.fetchAction();
                props.closeModal();
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

        if (_.isNumber(Number(currValue)) && currValue > 0) {
            setProductData(_.extend(productData, {
                price: currValue
            }));
            setCurrPrice(currValue);
        } else {
            event.target.value = currPrice;
        }
    }

    return (
        <div className="page-footer">
            <Modal
                open={props.open}
                onClose={props.closeModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Paper className={'new-product-modal'}>
                    <div className={'product-modal-content'}>
                        <h2>{t('ProductDashboard_NewProduct')}</h2>
                        <form id="new-product-form" action="POST" onSubmit={saveProduct}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <label htmlFor="img">{t('ProductModal_SelectImage')}&nbsp;&nbsp;</label>
                                    <input type="file" id="img" name="img" accept="image/*"
                                           onChange={handleImageChange}/>
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
                                            categories.map(item => (
                                                <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>))
                                        }

                                    </Select>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="name" required id="standard-required"
                                               label={t('ProductTable_Name')}
                                               variant="outlined" fullWidth onInput={handleInputChange}
                                               value={productData.name}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="productCode" required id="standard-required"
                                               label={t('ProductTable_Code')}
                                               variant="outlined" fullWidth onInput={handleInputChange}
                                               value={productData.productCode}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="shortDesc"
                                        id="outlined-multiline-static"
                                        label={t('Product_ShortDesc')}
                                        multiline
                                        rows={2}
                                        variant="outlined"
                                        fullWidth
                                        onInput={handleInputChange}
                                        value={productData.shortDesc}
                                    />
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
                                        value={productData.desc}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="price" type="text" data-old="" required id="standard-required"
                                               label={t('ProductTable_Price')}
                                               variant="outlined" fullWidth onInput={validateAndSaveQty}
                                               value={productData.price}/>
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
                                        value={productData.isFeatured}
                                    />
                                </Grid>
                                <Grid item xs={12} style={{textAlign: 'center'}}>
                                    <Button type="submit" variant="contained" color="primary"
                                            disabled={isImageUploading}>
                                        {t('ProductModal_AddProduct')}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Paper>
            </Modal>
        </div>
    )
}

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        loadingOn: () => dispatch(loadingOn()),
        loadingOff: () => dispatch(loadingOff())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ProductModifyModalComponent));