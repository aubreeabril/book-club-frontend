import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Icon, Affix } from "antd";

class Nav extends React.Component {
  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    console.log(isAuthenticated());
    return (
      <Affix offsetTop={0}>
        <Menu mode="horizontal">
          <Menu.Item>
            <NavLink to="/" exact>
              <Icon type="home" them="outlined" />
            </NavLink>
          </Menu.Item>

          <Menu.Item>
            <NavLink to="/books" exact>
              <Icon type="book" theme="outlined" />
            </NavLink>
          </Menu.Item>

          {isAuthenticated() && (
            <Menu.Item>
              <NavLink to="/dashboard" exact>
                <Icon type="user" theme="outlined" />
              </NavLink>
            </Menu.Item>
          )}

          {!isAuthenticated() && (
            <Menu.Item
              onClick={this.login.bind(this)}
              style={{ float: "right" }}
            >
              Login
            </Menu.Item>
          )}
          {isAuthenticated() && (
            <Menu.Item
              onClick={this.logout.bind(this)}
              style={{ float: "right" }}
            >
              Logout
            </Menu.Item>
          )}
        </Menu>
      </Affix>
    );
  }
}

export default Nav;
