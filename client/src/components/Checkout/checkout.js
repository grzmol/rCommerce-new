import React from "react";
import {CardElement, ElementsConsumer} from "@stripe/react-stripe-js";
import CardSection from "./CardSection/cardSection";
import Button from "@material-ui/core/Button";

import {withTranslation} from "react-i18next";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import "./checkout.css";

import {connect} from "react-redux";
import axios from "axios";
import {TextField} from "@material-ui/core";
import CartComponent from "../Cart/cart";
import { withRouter } from "react-router-dom";
import {loadingOff, loadingOn} from "../../actions/cartActions";


class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaymentLoading: false,
            isError: true,
            errorMessage: '',
            name: '',
            lastName: '',
            addressline1: '',
            addressline2: '',
            city: '',
            postalCode: '',
            country: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.props.loadingOn();
        const {stripe, elements} = this.props;
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        const result = await stripe.createToken(card);

        if (result.error) {
            alert(result.error.message);
            this.props.loadingOff();
        } else {
            let paymentData = {
                email: this.props.user.email,
                cardToken: result.token.id,
                amount: this.props.cart.totalPrice
            }
            axios.post('/api/payment/process', paymentData).then(resp => {
                if (resp.status === 400) {
                    alert(resp.data);
                } else {
                    let orderData = {
                        user: this.props.user.username,
                        name: this.state.name,
                        email: this.state.email,
                        lastName: this.state.lastName,
                        addressline1: this.state.addressline1,
                        addressline2: this.state.addressline2,
                        city: this.state.city,
                        postalCode: this.state.postalCode,
                        country: this.state.country
                    }
                    axios.post('/api/order/place', orderData).then(resp => {
                        if(resp && resp.data && resp.status === 200){
                            this.props.history.push('/orderConfirmation?order=' + resp.data._id);
                        }
                    });
                }
                this.props.loadingOff();
            });
        }
    };

    handleInputChange(event) {
        let currentTarget = event.target;
        let inputName = currentTarget.getAttribute('name')


        this.setState({
            [inputName]: currentTarget.value
        });
    }
    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({isError: false});
    };

    render() {
        const {t} = this.props;
        return (
            <div className="checkout-container">
                <Container>
                    <form onSubmit={this.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <h3>{t('Checkout_AddressSection')}</h3>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField id="shipping-name" name="name" label={t('Address_Name')}
                                                   required="true" fullWidth onInput={this.handleInputChange}/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField id="shipping-lastname" name="lastName" label={t('Address_LastName')}
                                                   required="true" fullWidth onInput={this.handleInputChange}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField id="shipping-addressline1" name="addressline1"
                                                   label={t('Address_Line1')} required="true" fullWidth onInput={this.handleInputChange}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField id="shipping-addressline2" name="addressline2"
                                                   label={t('Address_Line2')} fullWidth onInput={this.handleInputChange}/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField id="shipping-city" name="city" label={t('Address_City')}
                                                   required="true" fullWidth onInput={this.handleInputChange}/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField id="shipping-postalCode" name="postalCode"
                                                   label={t('Address_PostalCode')} required="true" fullWidth onInput={this.handleInputChange}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField id="shipping-country" name="country" label={t('Address_Country')}
                                                   required="true" fullWidth onInput={this.handleInputChange}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <h3>{t('Checkout_CardSection')}</h3>
                                        <CardSection/>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <CartComponent isCheckout={true}/>
                                <Grid item xs={12} style={{textAlign: 'center', marginTop: '20px'}}>
                                    <Button type="submit" variant="contained" color="default"
                                            disabled={!this.props.stripe} style={{marginRight: "15px"}}>
                                        {t('Checkout_ComeBack')}
                                    </Button>
                                    <Button type="submit" variant="contained" color="primary"
                                            disabled={!this.props.stripe}>
                                        {t('Checkout_PlaceOrder')}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        user: state.user,
        error: state.error,
        fetching: state.fetching
    }
}
function mapDispatchToProps(dispatch){
    return {
        loadingOn: ()=>dispatch(loadingOn()),
        loadingOff: ()=>dispatch(loadingOff())
    }

}
const CheckoutFormInjection = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(CheckoutForm)))

function CheckoutComponent() {
    return (
        <ElementsConsumer>
            {({stripe, elements}) => (
                <CheckoutFormInjection stripe={stripe} elements={elements}/>
            )}
        </ElementsConsumer>
    );
}

export default withTranslation()(CheckoutComponent);