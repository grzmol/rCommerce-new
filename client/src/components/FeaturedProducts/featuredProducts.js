import React from 'react';
import axios from "axios";
import {withTranslation} from "react-i18next";
import {Container} from "@material-ui/core";

import "./featuredProducts.css";
import {Link} from "react-router-dom";

class FeaturedProductsComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataReady: false,
            products: []
        }
    }

    componentDidMount() {
        axios.get('/api/product?isFeatured=true').then(resp => {
            if(resp.status === 200 && resp.data){
                this.setState({products: resp.data});
            }
            this.setState({dataReady: true});
        }).catch(err => {
            console.error(err)
        });

    }

    render() {
        const {t} = this.props;

        return (
            <Container>
                <div className="featured-products-container">
                    <h2>{t('FeaturedProducts_Title')}</h2>
                    <div className="featured-products-content">
                        {this.state.products.map( item => (
                            <Link to={'/product/' + item.productCode} className="featured-products-item">
                                <div>
                                    <div className="item-image">
                                        <img src={item.image} />
                                    </div>
                                    <div className="item-name">
                                        {item.name}
                                    </div>
                                    <div className="item-price">
                                        {item.price}&nbsp;PLN
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </Container>

        )
    }
};

export default withTranslation()(FeaturedProductsComponent);