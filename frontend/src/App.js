//import '../static/css/App.css';
//import "../static/css/AppMobile.css"
import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
//import UserProfile from './Pages/UserProfile';

//import HomePage from './Pages/HomePage';

//import CompraVenta from "./Pages/CompraVenta";
import Login from './Pages/Login';
import Register from './Pages/Register';
import HomePage from "./Pages/HomePage";
//import PageNotFound from "./Pages/PageNotFound";



export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/home" exact component ={HomePage} />
                </Switch>
            </Router>
        );
    }
  }




const appDiv = document.getElementById("app");
render(<App />, appDiv);