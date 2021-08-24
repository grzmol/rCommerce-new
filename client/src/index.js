import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

import './i18n';
import './styles/index.css';
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
