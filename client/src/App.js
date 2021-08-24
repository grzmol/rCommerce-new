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

class App extends React.Component {

    render() {
        let {history} = this.props;
        let authService = new AuthService();
        return (
            <BrowserRouter>
                <div>
                    <HeaderComponent history={authService} isLoggedIn={authService.isLoggedIn()}
                                     user={authService.getProfile()}/>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/register" component={RegisterPage}/>
                        <Route path="/admin" component={AdminPage}/>
                        <Route path="/cart" component={CartPage}/>
                        <Route path="/productList" component={ProductListPage}/>
                        <Route path="/account" component={AccountPage}/>
                    </Switch>
                    <FooterComponent/>
                </div>
            </BrowserRouter>
        );
    }
}

App.propTypes = {history: PropTypes.any}


export default App;
