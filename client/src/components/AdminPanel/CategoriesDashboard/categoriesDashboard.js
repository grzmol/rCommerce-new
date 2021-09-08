import React from 'react';
import axios from "axios";
import LoaderComponent from "../../Loader/loader";
import CategoryDashboardListComponent from "./CategoryDashboardList/categoryDashboardList";
import CategoryDashboardHeaderComponent from "./CategoryDashboardHeader/categoryDashboardHeader";


class CategoryDashboardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            dataReady: false,
        }
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData() {
        axios.get('/api/category').then(resp => {
            this.setState({
                categories: resp.data,
                dataReady: true
            });
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div className={'category-dashboard'}>
                {
                    this.state.dataReady ?
                        <div>
                            <CategoryDashboardHeaderComponent fetchAction={this.fetchData}/>
                            <CategoryDashboardListComponent categories={this.state.categories}
                                                            fetchAction={this.fetchData}/>
                        </div>
                        : <LoaderComponent/>
                }

            </div>
        );
    }
}

export default CategoryDashboardComponent;