import React from 'react';
import axios from "axios";
import ProductDashboardHeaderComponent from "./ProductDashboardHeader/productDashboardHeader";
import ProductDashboardListComponent from "./ProductDashboardList/productDashboardList";
import LoaderComponent from "../../Loader/loader";


class ProductDashboardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            dataReady: false,
        }
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(){
        axios.get('/api/product').then(resp => {
            this.setState({
                products: resp.data,
                dataReady: true
            });
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div className={'product-dashboard'}>
                {
                    this.state.dataReady ?
                        <div>
                            <ProductDashboardHeaderComponent fetchAction={this.fetchData} />
                            <ProductDashboardListComponent productList={this.state.products}/>
                        </div>
                    : <LoaderComponent />
                }

            </div>
        );
    }
}

export default ProductDashboardComponent;