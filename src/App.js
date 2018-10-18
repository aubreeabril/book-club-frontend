import React, { Component } from "react";
import Nav from "./components/Nav";

class App extends Component {
  componentDidMount() {
    // this.props.auth.getProfile();
  }

  render() {
    return (
      <div>
        <Nav auth={this.props.auth} />
      </div>
    );
  }
}

export default App;
