
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
import {AuthProvider} from "./context/AuthContext";
import BarraPrincipal from "./components/NavBar/BarraPrincipal";
import PrivateRoute from "./utils/PrivateRoute";
import PageNotFound from "./Pages/PageNotFound";


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <AuthProvider>
                    <Switch>
                        <Route path="/" exact component={Login} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/buysell/:type" component={BuySell}/>
                        <Route component ={HomePage} path="/home" exact/>

                        <Route exact path="/admin" component={Admin} />
                        <Route exact path="/profile" component={UserProfile}/>
                        <Route path="*" component={PageNotFound}/>
                    </Switch>
                </AuthProvider>

            </Router>
        );
    }
  }




const appDiv = document.getElementById("app");
render(<App />, appDiv);