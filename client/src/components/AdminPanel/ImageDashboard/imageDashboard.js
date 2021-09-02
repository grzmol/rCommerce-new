import React from 'react';
import axios from "axios";
import LoaderComponent from "../../Loader/loader";

import ImageDashboardListComponent from "./ImageDashboardList/imageDashboardList";
import ImageDashboardHeaderComponent from "./ImageDashboardHeader/imageDashboardHeader";



export default class ImageDashboardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            products: [],
            dataReady: false
        }
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(){
        axios.get('/api/image').then(resp => {
            if(resp.data && resp.status == 200){
                this.setState({
                    images: resp.data
                });
            }
            console.log(resp)

            axios.get('/api/product').then(respInner => {
                this.setState({
                    products: respInner.data,
                    dataReady: true
                });
            })
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div className={'image-dashboard'}>
                {
                    this.state.dataReady ?
                        <div>
                            <ImageDashboardHeaderComponent fetchAction={this.fetchData} products={this.state.products} />
                            <ImageDashboardListComponent images={this.state.images}  fetchAction={this.fetchData}/>
                        </div>
                        : <LoaderComponent />
                }

            </div>
        );
    }
}

