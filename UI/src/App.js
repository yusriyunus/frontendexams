import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import Login from "./components/loginpage";
import Register from "./components/registerpage";
import Home from "./components/home1";
import Checkout from "./components/checkout";

class App extends Component {
  state = {};

  render() {
    return (
      <div className="app">
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/checkout" component={Checkout} />
      </div>
    );
  }
}

export default App;
