import React, {useEffect, useState} from 'react';

import {withTranslation} from "react-i18next";
import Grid from "@material-ui/core/Grid";
import {Container, Divider, List, ListItem, ListItemText} from "@material-ui/core";
import CartItemComponent from "../../../Cart/CartItem/cartItem";
import axios from "axios";

const OrderDetailsComponent = (props) => {
    const [productsForItems, setProductsForItems] = useState(false);
    const {t} = props;
    const {orderAddress} = props.rowData;
    const order = props.rowData;


    useEffect(() => {
        if (!productsForItems) {
            fetchProductsForItems();
        }
    });

    const fetchProductsForItems = () => {
        const orderItems = order && order.orderItems;
        let productsToFetch = orderItems && orderItems.map(({product}) => product);


        axios.post('/api/product/getMany', {productIds: productsToFetch}).then(resp => {
            if (resp.status === 200 && resp.data) {
                setProductsForItems(resp.data);
            }
        }).catch(err => {
            console.error(err)
        });
    }

    return (
        <div className="myaccount-orderdetails-container">
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h2>{t('Checkout_Title')}</h2>
                    </Grid>
                    <Grid item xs={3}>
                        <h4>{t('Checkout_AddressSection')}</h4>
                        <List>
                            <ListItem>
                                <ListItemText primary={t('Address_Name')} secondary={orderAddress.name}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <ListItemText primary={t('Address_LastName')} secondary={orderAddress.lastName}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <ListItemText primary={t('Address_Line1')} secondary={orderAddress.addressline1}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <ListItemText primary={t('Address_City')} secondary={orderAddress.city}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <ListItemText primary={t('Address_PostalCode')} secondary={orderAddress.postalCode}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <ListItemText primary={t('Address_Country')} secondary={orderAddress.country}/>
                            </ListItem>
                            <Divider/>
                        </List>

                    </Grid>
                    <Grid item xs={9}>
                        <h4>{t('CartPage_Header')}</h4>
                        {order && order.orderItems.map(item => (
                            <CartItemComponent key={item.product} products={productsForItems} readOnly={true}
                                               data={item}/>
                        ))}
                    </Grid>
                </Grid>

            </Container>

        </div>
    );
};
export default withTranslation()(OrderDetailsComponent);