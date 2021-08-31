import React from 'react';
import axios from "axios";
import LoaderComponent from "../../Loader/loader";
import MenuDashboardListComponent from "./MenuDashboardList/menuDashboardList";
import MenuDashboardHeaderComponent from "./MenuDashboardHeader/menuDashboardHeader";


class MenuDashboardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: [],
            dataReady: false,
        }
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(){
        axios.get('/api/menu').then(resp => {
            this.setState({
                menuItems: resp.data,
                dataReady: true
            });
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div className={'menu-dashboard'}>
                {
                    this.state.dataReady ?
                        <div>
                            <MenuDashboardHeaderComponent fetchAction={this.fetchData}/>
                            <MenuDashboardListComponent menuItems={this.state.menuItems} fetchAction={this.fetchData}/>
                        </div>
                        : <LoaderComponent />
                }

            </div>
        );
    }
}

export default MenuDashboardComponent;