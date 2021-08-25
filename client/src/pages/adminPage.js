import React from "react";
import AdminPanelComponent from "../components/AdminPanel/adminPanel";
import AuthService from "../services/authService";
let authService = new AuthService();
const AdminPage = () => {
    return (
        <div className="admin-panel">
            {console.log(authService.getProfile())}
            <AdminPanelComponent isAdmin={authService.getProfile() ? authService.getProfile().isAdmin : false}/>
        </div>
    );
}

export default AdminPage;
