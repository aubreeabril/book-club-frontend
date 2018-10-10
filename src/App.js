import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import logo from "./logo.svg";
import BooksContainer from "./containers/BooksContainer";
import DashboardContainer from "./containers/DashboardContainer";
import Nav from "./components/Nav";
import Auth from "./Auth/Auth";
import history from "./history";

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

class App extends Component {
  render() {
    // const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <Nav />
        <Router history={history}>
          <div>
            <Route
              exact
              path="/books"
              render={props => <BooksContainer auth={auth} {...props} />}
            />
            <Route
              exact
              path="/dashboard"
              render={props => <DashboardContainer auth={auth} {...props} />}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
