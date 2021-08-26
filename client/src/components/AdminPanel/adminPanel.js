import React from 'react';

import { withTranslation } from 'react-i18next';
import {Route, withRouter} from 'react-router-dom';
import './adminPanel.css'
import AdminPanelMenuComponent from "../AdminPanelMenu/adminPanelMenu";
import ProductDashboardComponent from "./ProductDashboard/productDashboard";
import OrdersDashboardComponent from "./OrdersDashboard/ordersDashboard";
import CustomersDashboardComponent from "./CustomersDashboard/customersDashboard";

class AdminPanelComponent extends React.Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if(!this.props.isAdmin){
            this.props.history.replace('/');
        }
    }

    render() {
        const {t} = this.props;
        return (
            <div className={'admin-panel'}>
                <AdminPanelMenuComponent />
                <div className={'admin-dashboard'}>
                    <Route path={`${this.props.match.path}/products`} component={ProductDashboardComponent} />
                    <Route path={`${this.props.match.path}/orders`} component={OrdersDashboardComponent} />
                    <Route path={`${this.props.match.path}/customers`} component={CustomersDashboardComponent} />
                </div>
            </div>
        );
    }
}

export default withTranslation()(withRouter(AdminPanelComponent));