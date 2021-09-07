import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AuthService from "./services/authService";
import HeaderComponent from "./components/Header/header";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import AdminPage from "./pages/adminPage";
import CartPage from "./pages/cartPage";
import ProductListPage from "./pages/productListPage";
import AccountPage from "./pages/accountPage";
import FooterComponent from "./components/Footer/footer";
import * as PropTypes from "prop-types";
import ProductDetailsPage from "./pages/productDetailsPage";
import CheckoutPage from "./pages/checkoutPage";
import OrderConfirmationPage from "./pages/orderConfirmation";

class App extends React.Component {

    render() {
        let authService = new AuthService();

        const pagesWithoutHeader = ['admin', 'login', 'register'];
        const pagesWithoutFooter = ['admin'];
        return (
            <BrowserRouter>
                <div>
                    <HeaderComponent history={authService} isLoggedIn={authService.isLoggedIn()}
                                     user={authService.getProfile()} pagesWithoutHeader={pagesWithoutHeader}/>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/register" component={RegisterPage}/>
                        <Route path="/admin" component={AdminPage}/>
                        <Route path="/cart" component={CartPage}/>
                        <Route path="/productList" component={ProductListPage}/>
                        <Route path="/account" component={AccountPage}/>
                        <Route path="/product/:productCode" component={ProductDetailsPage} />
                        <Route path="/checkout" component={CheckoutPage} />
                        <Route path="/orderConfirmation" component={OrderConfirmationPage} />
                    </Switch>
                    <FooterComponent pagesWithoutFooter={pagesWithoutFooter}/>
                </div>
            </BrowserRouter>
        );
    }
}

App.propTypes = {history: PropTypes.any}


export default App;
