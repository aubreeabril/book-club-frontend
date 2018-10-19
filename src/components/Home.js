import React from "react";
import { connect } from "react-redux";
import { makeOrGetUser, getGroups } from "../redux/actions";
import books from "../images/books.jpg";

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
      <div span={12} style={{ textAlign: "center", marginTop: "15em" }}>
        <h1>Book Club</h1>
      </div>
    );
  }
}

export default connect(
  null,
  { makeOrGetUser, getGroups }
)(Home);
