//import '../static/css/App.css';
//import "../static/css/AppMobile.css"
import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

//import UserProfile from './Pages/UserProfile';

//import HomePage from './Pages/HomePage';


import Login from './Pages/Login';
import Register from './Pages/Register';
import BarraSecundaria from "./components/NavBar/BarraSecundaria";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/"><h1>Hola que tal</h1></Route>
                    <Route path="/home" component={BarraSecundaria} />
                </Switch>
            </Router>
        );
    }
  }

const appDiv = document.getElementById("app")
render(<App />, appDiv)