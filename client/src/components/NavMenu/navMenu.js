import React from 'react';

import "./navMenu.css";
import axios from "axios";
import {Link} from "react-router-dom";
import {Container} from "@material-ui/core";

export default class NavMenuComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataReady: false,
            menuItems: []
        }
    }

    componentDidMount() {
        axios.get('/api/category').then(resp => {
            if(resp.status === 200 && resp.data){
                this.setState({menuItems: resp.data});
            }
            this.setState({dataReady: true});
        }).catch(err => {
            console.error(err)
        });

    }

    render() {
        return (
            <div className="nav-menu-container">
                <Container>
                    {this.state.menuItems.map( item => (
                        <div className="nav-menu-item" key={item.name}>
                            <Link to={'/productList?category=' + item.name.toLowerCase()}>{item.name}</Link>
                        </div>
                    ))}
                </Container>
            </div>
        )
    }
};