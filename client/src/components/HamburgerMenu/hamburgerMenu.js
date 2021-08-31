import React from 'react';
import "./hamburgerMenu.css";
import axios from "axios";
import LoaderComponent from "../Loader/loader";
import MenuItem from '../MenuItem/menuItem'

export default class HamburgerMenuComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuItems: [],
            dataReady: false
        }
    }


    fetchMenuItems() {
        axios.get('/api/menu').then(resp => {
            this.setState({
                menuItems: resp.data,
                dataReady: true
            });
        });
    }

    componentDidMount() {
        this.fetchMenuItems();
    }


    render() {
        return (
            <div className="hamburger-menu">
                {
                    this.state.dataReady ?
                        <div>
                            {this.state.menuItems.map((item, index) =>
                                <MenuItem key={index} name={window.navigator.language === "pl" ? item.displayNamePL : item.displayNameEN} link={item.url}/>
                            )}
                        </div>
                    : <LoaderComponent/>
                }
            </div>
        )
    }
};