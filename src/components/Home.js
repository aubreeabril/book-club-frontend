import React from "react";
import { connect } from "react-redux";
import { makeOrGetUser, getGroups } from "../redux/actions";
import { Icon } from "antd";

const textStyle = {
  textAlign: "center",
  color: "rgb(117, 1, 117)"
};

class Home extends React.Component {
  componentDidMount() {
    this.props.getGroups();
    // this.props.makeOrGetUser(this.props.auth.userProfile);
  }

  render() {
    let height = window.innerHeight - 50;

    if (this.props.auth.isAuthenticated()) {
      this.props.auth.getProfile();
    }
    return (
      <div
        span={12}
        style={{
          minHeight: height,
          background: "rgb(238, 240, 243)"
        }}
      >
        <span>
          <h1
            style={{
              textAlign: "center",
              color: "rgb(117, 1, 117)",
              paddingTop: "7em"
            }}
          >
            <Icon type="team" theme="outlined" /> Make or join a club
          </h1>
          <h1 style={textStyle}>
            <Icon type="calendar" theme="outlined" color="green" /> Set a date
          </h1>
          <h1 style={textStyle}>
            <Icon type="book" theme="outlined" color="green" /> Vote on books
          </h1>
        </span>
      </div>
    );
  }
}

export default connect(
  null,
  { makeOrGetUser, getGroups }
)(Home);
