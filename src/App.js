import React, { Component } from "react";
import { Route } from "react-router-dom";
import logo from "./logo.svg";
import BooksContainer from "./containers/BooksContainer";
import DashboardContainer from "./containers/DashboardContainer";
import Nav from "./components/Nav";

class App extends Component {
  render() {
    // const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <Nav />
        <Route exact path="/books" component={BooksContainer} />
        <Route exact path="/dashboard" component={DashboardContainer} />
      </div>
    );
  }
}

export default App;
