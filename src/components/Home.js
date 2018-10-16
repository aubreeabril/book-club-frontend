import React from "react";
// import { connect } from "react-redux";

class Home extends React.Component {
  componentDidMount() {
    // debugger;
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

export default Home;
