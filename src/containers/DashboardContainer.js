import React from "react";
import { connect } from "react-redux";
import { getGroups } from "../redux/actions";
import UserInfo from "../components/UserInfo";
import { Layout } from "antd";

class DashboardContainer extends React.Component {
  componentDidMount() {
    this.props.auth.getProfile();
    this.props.getGroups();
  }

  render() {
    return (
      <Layout>
        {this.props.auth.userProfile ? (
          <UserInfo user={this.props.auth.userProfile} />
        ) : null}
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getGroups: () => dispatch(getGroups())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DashboardContainer);
