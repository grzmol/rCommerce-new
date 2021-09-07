import React from 'react';

import "./productGridItem.css";
import {Link} from "react-router-dom";
import {Fab} from "@material-ui/core";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import {withTranslation} from "react-i18next";
import {addToCart} from "../../actions/cartActions";
import {connect} from "react-redux";

class ProductGridItem extends React.Component {
    constructor(props) {
        super(props);
        this.addToCart = this.addToCart.bind(this);
    }

    addToCart(event) {
        let currentUser = this.props.currentUser;
        if(currentUser.username) {
            let productToAdd = {
                user: currentUser.username,
                product: event.currentTarget.dataset.product,
                quantity: 1
            }
            this.props.addToCart(productToAdd);
        }
    }

    render() {
        const item = this.props.product;
        const {t} = this.props;
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
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (itemToAdd)=> dispatch(addToCart(itemToAdd))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ProductGridItem));