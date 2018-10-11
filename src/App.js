import React, { Component } from "react";
import { Route } from "react-router-dom";

import Nav from "./components/Nav";
import Auth from "./Auth/Auth";

class App extends Component {
  render() {
    return (
      <div>
        <Nav auth={this.props.auth} />
      </div>
    );
  }
}

export default App;
