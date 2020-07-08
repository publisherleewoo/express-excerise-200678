import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";
import { App, Home, Login, Register } from "containers";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <BrowserRouter>
        <Route path="/" component={App} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
    </BrowserRouter>,
    rootElement
);
