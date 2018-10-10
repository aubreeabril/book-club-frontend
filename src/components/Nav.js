import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";
import Auth from "../Auth/Auth.js";

class Nav extends React.Component {
  gotTo(route) {
    this.props.history.replace(`/books`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    return (
      <Menu mode="horizontal" theme="dark">
        <Menu.Item>
          <Link to="/books">
            <Icon type="book" theme="outlined" />
          </Link>
        </Menu.Item>
        <Menu.Item onClick={this.login.bind(this)}>
          <Link to="/dashboard">
            <Icon type="team" theme="outlined" />
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/">
            <Icon type="home" them="outlined" />
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Nav;
