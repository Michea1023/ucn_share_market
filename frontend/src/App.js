//import '../static/css/App.css';
//import "../static/css/AppMobile.css"
import React, { Component } from "react";
import { render } from "react-dom";
import {BrowserRouter as Router, Switch, Route, Link, Redirect, BrowserRouter} from "react-router-dom";

import Login from './Pages/Login';
import Register from './Pages/Register';
import HomePage from "./Pages/HomePage";
import BuySell from "./Pages/BuySell";
//import PageNotFound from "./Pages/PageNotFound";
import Admin from "./Pages/Admin";
import UserProfile from "./Pages/UserProfile";


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/home" exact component ={HomePage} />
                    <Route path="/buysell" exact component={BuySell} />
                    <Route path="/admin" exact component={Admin} />
                    <Route path="/profile" exact component={UserProfile}/>


                </Switch>
            </BrowserRouter>
        );
    }
  }




const appDiv = document.getElementById("app");
render(<App />, appDiv);