import React from "react";
import { NavLink } from "react-router-dom";
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
      <Menu mode="horizontal">
        <Menu.Item>
          <NavLink to="/books" exact>
            <Icon type="book" theme="outlined" />
          </NavLink>
        </Menu.Item>

        <Menu.Item>
          <NavLink to="/dashboard" exact>
            <Icon type="team" theme="outlined" />
          </NavLink>
        </Menu.Item>

        <Menu.Item>
          <NavLink to="/" exact>
            <Icon type="home" them="outlined" />
          </NavLink>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Nav;
