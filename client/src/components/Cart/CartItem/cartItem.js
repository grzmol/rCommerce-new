import React, {useEffect, useState} from 'react';

import {withTranslation} from 'react-i18next';
import Grid from "@material-ui/core/Grid";
import {Divider, IconButton, TextField} from "@material-ui/core";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import {Delete} from "@material-ui/icons";

const CartItemComponent = (props) => {
    const {t} = props;
    const [itemQty, setItemQty] = useState(props.data.quantity);
    const [qtyInputDisabled, setQtyInputDisabled] = useState(true);
    const [itemTotalPrice, setItemPrice] = useState(props.data.itemPrice);
    const productForItem = _.filter(props.products, item => {
        return item._id === props.data.product
    })[0] || {};


    useEffect(() => {
        setQtyInputDisabled(Number(props.data.quantity) === Number(itemQty));
    });

    const validateAndSaveQty = (event) => {
        let currValue = event.target.value;

        if (_.isNumber(Number(currValue)) && currValue > 0) {
            setItemQty(currValue)
            setItemPrice(Number(currValue) * Number(productForItem.price));
        } else {
            event.target.value = itemQty;
        }
    }
    const updateQuantity = () => {
        const requestData = {
            cartId: props.cart._id,
            itemId: props.data._id,
            quantity: itemQty
        }
        props.updateQuantity(requestData);
    }


    const removeCartItem = () => {
        const requestData = {
            cartId: props.cart._id,
            itemId: props.data._id
        }
        props.removeCartItem(requestData);
    }

    return (
        <div className="cart-item">
            <Grid container spacing={3} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Grid item xs={2}>
                    <img className="cart-item-image" src={productForItem.image} alt=""/>
                </Grid>
                <Grid item xs={5}>
                    <h4>{productForItem.name}</h4>
                    <span>{t('ProductDetail_Code')}:&nbsp;{productForItem.productCode}</span>
                </Grid>
                <Grid item xs={props.readOnly ? 4 : 1}>
                    <h4>{itemTotalPrice}&nbsp;PLN {props.readOnly ? `x ${props.data.quantity}` : ''}</h4>
                </Grid>
                <Grid item xs={1} style={{display: props.readOnly ? 'none' : 'block'}}>
                    <TextField
                        id="qty-input"
                        className="qty-input"
                        type="number"
                        value={itemQty}
                        onInput={validateAndSaveQty}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={2} style={{display: props.readOnly ? 'none' : 'block'}}>
                    <Button variant="contained" color="primary" onClick={updateQuantity} disabled={qtyInputDisabled}
                            fullWidth>
                        {t('CartPage_Update')}
                    </Button>
                </Grid>
                <Grid item xs={1} style={{visibility: props.readOnly ? 'hidden' : 'normal'}}>
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={removeCartItem}>
                        <Delete/>
                    </IconButton>
                </Grid>
            </Grid>
            <Divider/>
        </div>
    );
}
export default withTranslation()(CartItemComponent);