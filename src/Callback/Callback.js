import React, { Component } from "react";
// import { connect } from "react-redux";
// import { makeOrGetUser } from '../redux/actions'
import loading from "./loading.svg";

class Callback extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated()) {
      this.props.auth.getProfile();
    }
  }

  render() {
    const style = {
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "white"
    };

    return (
      <div style={style}>
        <img src={loading} alt="loading" />
      </div>
    );
  }
}

export default Callback;
