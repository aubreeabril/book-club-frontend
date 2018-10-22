import React from "react";
import { connect } from "react-redux";
import { makeOrGetUser, getGroups } from "../redux/actions";
import { Icon, Timeline } from "antd";

class Home extends React.Component {
  componentDidMount() {
    this.props.getGroups();
    // this.props.makeOrGetUser(this.props.auth.userProfile);
  }

  render() {
    let height = window.innerHeight;

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
          <h1 style={{ textAlign: "center", paddingTop: "7em" }}>
            <Icon type="team" theme="outlined" color="blue" /> Make or join a
            club
          </h1>
          <h1 style={{ textAlign: "center" }}>
            <Icon type="calendar" theme="outlined" color="green" /> Set a date
          </h1>
          <h1 style={{ textAlign: "center" }}>
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
