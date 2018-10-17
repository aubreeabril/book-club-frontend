import React from "react";
import { connect } from "react-redux";
import { Card, Avatar } from "antd";

class ProfileCard extends React.Component {
  render() {
    return (
      <Card title={this.props.currentUser.name}>
        <Avatar src={this.props.currentUser.picture} />
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(ProfileCard);
