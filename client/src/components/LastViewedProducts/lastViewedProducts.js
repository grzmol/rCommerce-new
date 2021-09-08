import React from 'react';
import axios from "axios";
import {withTranslation} from "react-i18next";
import {Container} from "@material-ui/core";
import "./lastViewedProducts.css";

import ProductGridItem from "../ProductGridItem/productGridItem";


class LastViewedProductsComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataReady: false,
            products: []
        }
    }
    componentDidMount() {
        let productIdsJSON = sessionStorage.getItem('lastViewed') || "[]";
        let productIds = JSON.parse(productIdsJSON);

        axios.post('/api/product/getMany', {productIds: productIds}).then(resp => {
            if(resp.status === 200 && resp.data){
                this.setState({products: resp.data, dataReady: true});
            }
        }).catch(err => {
            console.error(err)
        });

    }

    render() {
        const {t} = this.props;

        return (
            <Container style={{display: this.state.products.length > 0 ? 'block' : 'none'}}>
                <div className="last-viewed-products-container">
                    <h2>{t('LastViewedProducts_Title')}</h2>
                    <div className="last-viewed-products-content">
                        {this.state.products.map( item => (
                            <ProductGridItem key={item.productCode} currentUser={this.props.currentUser} product={item} />
                        ))}
                    </div>
                </div>
            </Container>

        )
    }
};

export default withTranslation()(LastViewedProductsComponent);