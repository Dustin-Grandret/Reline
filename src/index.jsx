import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./redux/store/store";

import App from "./App";

ReactDOM.render(
    <Provider store={store} a={1}>
        <App />
    </Provider>,
    document.getElementById("root"),
);
