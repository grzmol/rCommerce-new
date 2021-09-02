import React from 'react';
import "./headerMenu.css";
import axios from "axios";
import LoaderComponent from "../Loader/loader";
import MenuItem from '../MenuItem/menuItem'
import _ from 'lodash';


import { withTranslation } from "react-i18next";

class HeaderMenuComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: [],
            dataReady: false
        }
    }


    fetchMenuItems() {
        axios.get('/api/menu').then(resp => {
            if(_.isArray(resp.data)){
                this.setState({
                    menuItems: resp.data,
                    dataReady: true
                });
            }
        });
    }

    componentDidMount() {
        this.fetchMenuItems();
    }


    render() {
        const { t } = this.props;
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

export default withTranslation()(HeaderMenuComponent);