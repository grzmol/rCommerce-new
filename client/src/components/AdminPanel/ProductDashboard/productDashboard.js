import React from 'react';
import axios from "axios";
import { withTranslation } from 'react-i18next';
import ProductDashboardHeaderComponent from "./ProductDashboardHeader/productDashboardHeader";
import ProductDashboardListComponent from "./ProductDashboardList/productDashboardList";
import LoaderComponent from "../../Loader/loader";


class ProductDashboardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            dataReady: false
        }
    }

    componentDidMount() {
        axios.get('/api/product').then(resp => {
            console.log('resppp', resp)
            this.setState({
                products: resp.data,
                dataReady: true
            })
            console.log(resp)
        })
    }

    render() {
        const {t} = this.props;
        return (
            <div className={'product-dashboard'}>
                {
                    this.state.dataReady ?
                        <div>
                            <ProductDashboardHeaderComponent />
                            <ProductDashboardListComponent productList={this.state.products}/>
                        </div>
                    : <LoaderComponent />
                }

            </div>
        );
    }
}

export default withTranslation()(ProductDashboardComponent);