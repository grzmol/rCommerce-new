import React from 'react';

import "./productGridItem.css";
import {Link} from "react-router-dom";
import {Backdrop, CircularProgress, Fab} from "@material-ui/core";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import axios from "axios";
import MuiAlert from '@material-ui/lab/Alert';
import _ from "lodash";

import { withTranslation } from "react-i18next";

class ProductGridItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddToMessage: false,
            showBackdrop: false
        };
        this.addToCart = this.addToCart.bind(this);
        this.showAddToMessage = this.showAddToMessage.bind(this);
        this.hideAddToMessage = this.hideAddToMessage.bind(this);

    }

    addToCart(event) {
        let currentUser = this.props.currentUser;
        this.setState({showBackdrop: true});
        if(currentUser.username){
            let productToAdd = {
                user: currentUser.username,
                product: event.currentTarget.dataset.product,
                quantity: 1
            };
            axios.post('/api/cart/addItem', productToAdd).then(resp => {
                if(resp.status === 200 && !_.isEmpty(resp.data)){
                    this.setState({cart: resp.data});
                    this.showAddToMessage();
                    window.actions.fetchHeaderInfo();
                }
                this.setState({showBackdrop: false});
            }).catch(err => {
                console.error(err)
            })
        }
    }


    showAddToMessage(){
        this.setState({showAddToMessage: true});
        setTimeout(this.hideAddToMessage, 2000);

    }

    hideAddToMessage(){
        this.setState({showAddToMessage: false});
    }

    render() {
        const item = this.props.product;
        const {t} = this.props;

        const addToCartMessageStyle = {
            position: 'fixed',
            top: '85px',
            right: this.state.showAddToMessage ? '20px' : '-500px',
            transition: 'right 1s'
        }
        const backdropStyle = {
            zIndex: 6,
            color: '#fff'
        }
        function Alert(props) {
            return <MuiAlert elevation={6} variant="filled" {...props} style={addToCartMessageStyle}/>;
        }

        return (
            <div>
                <div className="product-grid-item">
                    <Link to={'/product/' + item.productCode}>
                        <div className="item-image">
                            <img src={item.image} />
                        </div>
                        <div className="item-name">
                            {item.name}
                        </div>
                        <div className="item-price">
                            {item.price}&nbsp;PLN
                        </div>
                    </Link>
                    <Fab color="primary" className="item-add-to" data-product={item._id} onClick={this.addToCart} style={{backgroundColor: "#13ad25"}} aria-label="add">
                        <AddShoppingCartIcon />
                    </Fab>
                </div>
                <Alert severity="success">{t('AddToCart_Success')}</Alert>
                <Backdrop style={backdropStyle} open={this.state.showBackdrop}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>


        )
    }
};

export default withTranslation()(ProductGridItem);