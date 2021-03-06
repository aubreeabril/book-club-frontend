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
import ClubContainer from "./containers/ClubContainer";
import Home from "./components/Home";
import { ActionCableProvider } from "react-actioncable-provider";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

ReactDOM.render(
  <Provider store={store}>
    <ActionCableProvider url={`ws://localhost:3001/cable`}>
      <Router history={history}>
        <div>
          <App auth={auth} />
          <Route
            exact
            path="/"
            render={props => <Home auth={auth} {...props} />}
          />
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
          <Route
            exact
            path="/callback"
            render={props => {
              handleAuthentication(props);
              return <Callback auth={auth} {...props} />;
            }}
          />
          <Route
            path="/club/:id"
            render={props => <ClubContainer auth={auth} {...props} />}
          />
        </div>
      </Router>
    </ActionCableProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
