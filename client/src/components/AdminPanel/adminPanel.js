import React from 'react';

import {Route, withRouter} from 'react-router-dom';
import './adminPanel.css'
import AdminPanelMenuComponent from "../AdminPanelMenu/adminPanelMenu";
import ProductDashboardComponent from "./ProductDashboard/productDashboard";
import OrdersDashboardComponent from "./OrdersDashboard/ordersDashboard";
import CustomersDashboardComponent from "./CustomersDashboard/customersDashboard";
import MenuDashboardComponent from "./MenuDashboard/menuDashboard";
import CategoryDashboardComponent from "./CategoriesDashboard/categoriesDashboard";
import ImageDashboardComponent from "./ImageDashboard/imageDashboard";

class AdminPanelComponent extends React.Component {

    componentDidMount() {
        if(!this.props.isAdmin){
            this.props.history.replace('/');
        }
    }

    render() {
        return (
            <div className={'admin-panel'}>
                <AdminPanelMenuComponent />
                <div className={'admin-dashboard'}>
                    <Route path={`${this.props.match.path}/products`} component={ProductDashboardComponent} />
                    <Route path={`${this.props.match.path}/orders`} component={OrdersDashboardComponent} />
                    <Route path={`${this.props.match.path}/category`} component={CategoryDashboardComponent} />
                    <Route path={`${this.props.match.path}/customers`} component={CustomersDashboardComponent} />
                    <Route path={`${this.props.match.path}/menu`} component={MenuDashboardComponent} />
                    <Route path={`${this.props.match.path}/images`} component={ImageDashboardComponent} />
                </div>
            </div>
        );
    }
}

export default withRouter(AdminPanelComponent);