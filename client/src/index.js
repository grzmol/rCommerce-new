import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

import './axiosConfig';
import './i18n';
import './styles/index.css';
import App from "./App";
import cartReducer from "./reducers/cartReducer";
import {applyMiddleware, compose, createStore} from "redux";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';


const middlewareEnhancer = applyMiddleware(thunk);
const composedEnhancers = compose(middlewareEnhancer);
const store = createStore(cartReducer, undefined, composedEnhancers)

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById("root"));
registerServiceWorker();
