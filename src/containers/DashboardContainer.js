import React from "react";
import { connect } from "react-redux";
import { getGroups } from "../redux/actions";
import UserInfo from "../components/UserInfo";
import { Layout } from "antd";
const { Content } = Layout;

class DashboardContainer extends React.Component {
  componentDidMount() {
    this.props.auth.getProfile();
    this.props.getGroups();
  }

  render() {
    return (
      <Layout>
        <Content>
          {this.props.auth.userProfile ? (
            <UserInfo user={this.props.auth.userProfile} />
          ) : null}
        </Content>
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
