import React from 'react';
import {CircularProgress} from "@material-ui/core";

import "./loader.css";

const LoaderComponent = (props) => {

    return (
        <div className={'page-loader'} {...props}>
            <CircularProgress />
        </div>
    );
};
export default LoaderComponent;