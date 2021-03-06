import React from "react";
import { connect } from "react-redux";
import { getGroups } from "../redux/actions";
import { Layout } from "antd";
import UserInfoRefactor from "../components/UserInfoRefactor";

class DashboardContainer extends React.Component {
  componentDidMount() {
    // this.props.auth.getProfile();
    this.props.getGroups();
  }

  render() {
    let height = window.innerHeight;
    return (
      <Layout
        style={{
          minHeight: height,
          backgroundColor: "rgb(238, 240, 243)",
          overflow: "hidden"
        }}
      >
        {this.props.auth.userProfile ? (
          <React.Fragment>
            <UserInfoRefactor
              user={this.props.auth.userProfile}
              history={this.props.history}
            />
          </React.Fragment>
        ) : (
          this.props.history.push("/")
        )}
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
