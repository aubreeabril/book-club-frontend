import React from "react";
import { connect } from "react-redux";
import { makeOrGetUser, getGroups } from "../redux/actions";

class Home extends React.Component {
  componentDidMount() {
    this.props.getGroups();
    // this.props.makeOrGetUser(this.props.auth.userProfile);
  }

  render() {
    if (this.props.auth.isAuthenticated()) {
      this.props.auth.getProfile();
    }
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}

export default connect(
  null,
  { makeOrGetUser, getGroups }
)(Home);
