import React from "react";
import AuthWrapper from "../components/authWrapper";
import MyAccountComponent from "../components/MyAccount/myAccount";

const AccountPage = () => {
    return (
        <div>
            <MyAccountComponent/>
        </div>
    );
}

export default AuthWrapper(AccountPage);
