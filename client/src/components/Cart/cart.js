import React from 'react';
import {withTranslation} from "react-i18next";
import {Container} from "@material-ui/core";

import "./cart.css";
import {fetchCart, loadingOff, loadingOn, removeCartItem, updateItemQuantity} from "../../actions/cartActions";
import {connect} from "react-redux";
import CartItemComponent from "./CartItem/cartItem";
import _ from 'lodash';
import axios from "axios";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";


class CartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productsForItems: [],
            refetchProducts: true,
            couponCode: ''
        }
    }

    fetchProductsForItems(){
        const cartItems = this.props.cart && this.props.cart.cartItems;
        let productsToFetch = cartItems && cartItems.map(({product}) => product);

        if(productsToFetch && (this.state.productsForItems.length !== productsToFetch.length)){
            this.props.loadingOn();
            axios.post('/api/product/getMany', {productIds: productsToFetch}).then(resp => {
                if(resp.status === 200 && resp.data){
                    this.setState({productsForItems: resp.data, refetchProducts: false});
                }
                this.props.loadingOff();
            }).catch(err => {
                console.error(err)
            });
        }
        console.log(productsToFetch)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.fetchProductsForItems();
    }
    render() {
        const {t} = this.props;
        const {cart} = this.props;

        const noProductsDisplay = () => {
            return <h4>{t('CartPage_EmptyCart')}</h4>
        }
        let displayCart = cart && cart.cartItems && !_.isEmpty(cart.cartItems);
        return (
            <Container>
                <div className="cart-container">
                    <h1>{t('CartPage_Header')}<span className="cart-item-count">&nbsp;({this.props.cart.totalQuantity || 0 })</span> </h1>
                    <div className="cart-items-table">
                        {displayCart ? (
                            cart.cartItems.map(item => <CartItemComponent key={item.product} readOnly={this.props.isCheckout} cart={cart} products={this.state.productsForItems} data={item} updateQuantity={this.props.updateItemQuantity} removeCartItem={this.props.removeCartItem}/>)
                        ) : noProductsDisplay()}
                    </div>
                    <div className="cart-footer" style={{display: displayCart ? 'inline-block' : 'none'}}>
                        <div className="cart-footer-content">
                            <div className="cart-totals">
                                <h3>Kwota całkowita: {cart.totalPrice}&nbsp;PLN</h3>
                            </div>
                            <Link to="/checkout" style={{display: this.props.isCheckout ? 'none' : 'block'}}>
                                <Button variant="contained" color="primary">
                                    {t('CartPage_GoToCheckout')}
                                </Button>
                            </Link>
                        </div>

                    </div>
                </div>
            </Container>
        )
    }
};


const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        user: state.user,
        error: state.error,
        fetching: state.fetching,
        showAddToMessage: state.showAddToMessage
    }
}
function mapDispatchToProps(dispatch){
    return {
        fetchCart: ()=> dispatch(fetchCart()),
        loadingOn: ()=>dispatch(loadingOn()),
        loadingOff: ()=>dispatch(loadingOff()),
        updateItemQuantity: (data)=>dispatch(updateItemQuantity(data)),
        removeCartItem: (data)=>dispatch(removeCartItem(data))
    }

}

export default  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CartComponent));