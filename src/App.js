import React, { Component } from "react";

import Nav from "./components/Nav";

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
