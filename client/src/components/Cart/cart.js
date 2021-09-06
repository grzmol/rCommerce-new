import React from 'react';
import {withTranslation} from "react-i18next";
import {Container} from "@material-ui/core";

import "./cart.css";
import {addToCart, fetchCart, loadingOff, loadingOn} from "../../actions/cartActions";
import {connect} from "react-redux";
import CartItemComponent from "./CartItem/cartItem";
import _ from 'lodash';
import axios from "axios";


class CartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productsForItems: [],
            refetchProducts: true
        }
    }

    fetchProductsForItems(){
        const cartItems = this.props.cart && this.props.cart.cartItems;
        let productsToFetch = cartItems && cartItems.map(({product}) => product);

        if(productsToFetch){
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
        if(this.props.cart && this.state.refetchProducts){
            this.fetchProductsForItems();
        }
    }

    render() {
        const {t} = this.props;
        const {cart} = this.props;

        const noProductsDisplay = () => {
            return <h4>{t('CartPage_EmptyCart')}</h4>
        }

        return (
            <Container>
                <div className="cart-container">
                    <h1>{t('CartPage_Header')}<span className="cart-item-count">&nbsp;({cart.totalQuantity || 0 })</span> </h1>
                    <div className="cart-items-table">
                        {cart && cart.cartItems ? (
                            cart.cartItems.map(item => <CartItemComponent key={item.product} products={this.state.productsForItems} data={item} addToCart={this.props.addToCart}/>)
                        ) : noProductsDisplay()}
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
        addToCart: (itemToAdd)=> dispatch(addToCart(itemToAdd)),
        loadingOn: ()=>dispatch(loadingOn()),
        loadingOff: ()=>dispatch(loadingOff())
    }

}

export default  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CartComponent));