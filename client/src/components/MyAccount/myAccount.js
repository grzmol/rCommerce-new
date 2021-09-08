import React from 'react';
import "./myAccount.css";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import MyAccountNavComponent from "./MyAccountNavigation/myAccountNavigation";
import {Route, withRouter} from "react-router-dom";
import MyAccountOrdersComponent from "./MyAccountOrders/myAccountOrders";
import MyAccountInformationComponent from "./MyAccountInformation/myAccountInformation";

const MyAccountComponent = (props) => {

    return (
        <div className="myaccount-container">
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <MyAccountNavComponent/>
                    </Grid>
                    <Grid item xs={9}>
                        <Route path={`${props.match.path}/information`} component={MyAccountInformationComponent}/>
                        <Route path={`${props.match.path}/orders`} component={MyAccountOrdersComponent}/>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};
export default withRouter(MyAccountComponent);