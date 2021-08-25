import React from 'react';

import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import './adminPanel.css'

class AdminPanelComponent extends React.Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if(!this.props.isAdmin){
            this.props.history.replace('/');
        }
    }

    render() {
        const {t} = this.props;
        return (
            <div>

            </div>
        );
    }
}

export default withTranslation()(withRouter(AdminPanelComponent));