import React from 'react';
import "./headerMenu.css";
import axios from "axios";
import LoaderComponent from "../Loader/loader";
import MenuItem from '../MenuItem/menuItem'
import _ from 'lodash';
import {FormControl, Input, InputAdornment, InputLabel} from "@material-ui/core";
import {Search} from "@material-ui/icons";

import {withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";

class HeaderMenuComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: [],
            dataReady: false,
            searchString: ''
        }
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.searchForProduct = this.searchForProduct.bind(this);
    }


    fetchMenuItems() {
        axios.get('/api/menu').then(resp => {
            if (_.isArray(resp.data)) {
                this.setState({
                    menuItems: resp.data,
                    dataReady: true
                });
            }
        });
    }
    searchForProduct(event){
        this.props.history.push('/productList?search=' + this.state.searchString);
        this.props.closeMenu();
    }
    handleSearchInput(event){
        let target = event.target;
        this.setState({searchString: target.value});
        if(event.keyCode === 13){
            this.searchForProduct();
        }
    }
    componentDidMount() {
        this.fetchMenuItems();
    }


    render() {
        const {t} = this.props;
        return (
            <div className="hamburger-menu">
                <FormControl style={{width: "300px", margin: "50px"}}>
                    <InputLabel htmlFor="input-with-icon-adornment">{t('Search_Title')}</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start"  onClick={this.searchForProduct}>
                                <Search />
                            </InputAdornment>
                        }
                        onKeyUp={this.handleSearchInput}
                    />
                </FormControl>
                {
                    this.state.dataReady ?
                        <div>
                            {this.state.menuItems.map((item, index) =>
                                <MenuItem key={index}
                                          name={window.navigator.language === "pl" ? item.displayNamePL : item.displayNameEN}
                                          link={item.url}/>
                            )}
                        </div>
                        : <LoaderComponent/>
                }
            </div>
        )
    }
}

export default withTranslation()(withRouter(HeaderMenuComponent));