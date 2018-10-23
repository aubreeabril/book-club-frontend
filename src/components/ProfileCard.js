import React from "react";
import { connect } from "react-redux";
import { Avatar } from "antd";

class ProfileCard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1 style={{ textAlign: "center" }}>
          {`Welcome ${this.props.currentUser.name} `}
          <Avatar src={this.props.currentUser.picture} />
        </h1>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(ProfileCard);
