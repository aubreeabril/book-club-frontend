import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Auth from "./Auth/Auth";
import history from "./history";
import store from "./redux/store";
import Callback from "./Callback/Callback";
import BooksContainer from "./containers/BooksContainer";
import DashboardContainer from "./containers/DashboardContainer";

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <App auth={auth} />
        <Route exact path="/books" component={BooksContainer} />
        <Route exact path="/dashboard" component={DashboardContainer} />
        <Route
          exact
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
