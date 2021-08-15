import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import App from "./App";
import LoginPage from "./pages/loginPage";
import RegisterPage from './pages/registerPage';

import registerServiceWorker from "./registerServiceWorker";

import './i18n';

import './styles/index.scss';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage}/>
            <Route component={App} />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);
registerServiceWorker();
