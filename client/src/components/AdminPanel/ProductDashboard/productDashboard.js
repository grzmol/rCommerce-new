import React from 'react';
import axios from "axios";
import { withTranslation } from 'react-i18next';


class ProductDashboardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        axios.get('/api/product').then(resp => {
            console.log(resp)
        })
    }

    render() {
        const {t} = this.props;
        return (
            <div className={'product-dashboard'}>
                productDashboard
            </div>
        );
    }
}

export default withTranslation()(ProductDashboardComponent);