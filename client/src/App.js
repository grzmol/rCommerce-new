import React from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "./pages/homePage";
import AuthService from "./services/authService";
import HeaderComponent from "./components/Header/header";

const authService = new AuthService();
const App = ({history}) => (
    <div>
        <HeaderComponent history={authService} isLoggedIn={authService.isLoggedIn()} user={authService.getProfile()} />
        <Container>
            <Switch>
                <Route exact path="/" component={Home}/>
            </Switch>
        </Container>
    </div>
);

const Container = ({children}) => (
    <div className="container">{children}</div>
)


export default App;
