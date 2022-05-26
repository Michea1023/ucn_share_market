//import '../static/css/App.css';
//import "../static/css/AppMobile.css"
import React, { Component } from "react";
import { render } from "react-dom";
/*
import UserProfile from './Pages/UserProfile';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Register from './Pages/Register';
*/

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<h1> Testing React Code </h1>);
    }
  }

  const appDiv = document.getElementById("app")
render(<App />, appDiv)