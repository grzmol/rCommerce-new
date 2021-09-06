import React, {useState} from 'react';

import {withTranslation} from 'react-i18next';
import Grid from "@material-ui/core/Grid";
import {Divider, IconButton, TextField} from "@material-ui/core";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import {Delete} from "@material-ui/icons";

const CartItemComponent = (props) => {
    const { t } = props;
    const [itemQty, setItemQty] = useState(props.data.quantity);
    const productForItem = _.filter(props.products, item => {
        return item._id === props.data.product
    })[0] || {};

    const validateAndSaveQty = (event) => {
        let currValue = event.target.value;

        if(_.isNumber(Number(currValue)) && currValue > 0){
            setItemQty(currValue)
        }else{
            event.target.value = itemQty;
        }

    }
    const updateQuantity = () => {

    }
    return (
        <div className="cart-item">
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <img className="cart-item-image" src={productForItem.image} alt="" />
                </Grid>
                <Grid item xs={6}>
                    <h4>{productForItem.name}</h4>
                    <span>{t('ProductDetail_Code')}:&nbsp;{productForItem.productCode}</span>
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        id="standard-number"
                        label={t('ProductDetail_Quantity')}
                        type="number"
                        value={itemQty}
                        onInput={validateAndSaveQty}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" color="primary" onClick={updateQuantity} disabled={props.data.quantity === itemQty} fullWidth>
                        {t('CartPage_Update')}
                    </Button>
                </Grid>
                <Grid item xs={1}>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <Delete />
                    </IconButton>
                </Grid>
            </Grid>
            <Divider />
        </div>
    );
}
export default withTranslation()(CartItemComponent);