import React from 'react';
import {CircularProgress} from "@material-ui/core";

import "./loader.css";

const LoaderComponent = (props) => {

    return (
        <div className={'page-loader'}>
            <CircularProgress />
        </div>
    );
}
export default LoaderComponent;