import React, { Component } from "react";
import { Route } from "react-router-dom";
import BooksContainer from "./containers/BooksContainer";
import DashboardContainer from "./containers/DashboardContainer";
import Nav from "./components/Nav";
// import Auth from "./Auth/Auth";
// import history from "./history";
//
// const auth = new Auth();
//
// const handleAuthentication = (nextState, replace) => {
//   if (/access_token|id_token|error/.test(nextState.location.hash)) {
//     auth.handleAuthentication();
//   }
// };

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
