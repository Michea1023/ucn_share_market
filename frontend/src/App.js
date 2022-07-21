import React from "react";
import { render } from "react-dom";
import {BrowserRouter as Router, Switch, Route, Link, Redirect, BrowserRouter} from "react-router-dom";
import Login from './Pages/Login';
import Register from './Pages/Register';
import HomePage from "./Pages/HomePage";
import BuySell from "./Pages/BuySell";
import Admin from "./Pages/Admin";
import UserProfile from "./Pages/UserProfile";
import {AuthProvider} from "./context/AuthContext";
import PageNotFound from "./Pages/PageNotFound";
import Forgot from "./Pages/Forgot";



export default function App(){
    document.body.style.backgroundColor = '#FBFCFC'; //color de fondo
    return (
            <Router>
                <AuthProvider>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/forgot" component={Forgot} />

                        <Route exect path="/buysell/:type" component={BuySell}/>
                        <Route component ={HomePage} exact path="/home" />
                        <Route exact component={UserProfile} path="/profile"/>

                        <Route exact path="/admin" component={Admin} />
                        <Route exact path="*" component={PageNotFound}/>
                    </Switch>
                </AuthProvider>

            </Router>
        );
  }


const appDiv = document.getElementById("app");
render(<App />, appDiv);