import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { makeOrGetUser, fetchGroupBooks } from "../redux/actions";
import ProfileCard from "./ProfileCard";
import ProfileClubs from "./ProfileClubs";
import ProfileCollapse from "./ProfileCollapse";
import ProfileBooks from "./ProfileBooks";
import { Layout, Row } from "antd";
import loading from "../Callback/loading.svg";

const Content = Layout;

class UserInfoRefactor extends React.Component {
  componentDidMount() {
    this.props.makeOrGetUser(this.props.user);
    this.props.fetchGroupBooks();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.currentUser ? (
          <Content style={{ margin: "1em" }}>
            <Row>
              {/* <Col span={12}> */}
              <ProfileCard history={this.props.history} />
              {/* </Col> */}
              {/* <Col span={12}> */}
            </Row>
            <Row>
              <ProfileClubs />
              {/* </Col> */}
            </Row>
            <ProfileCollapse />

            <ProfileBooks history={this.props.history} />
          </Content>
        ) : (
          <img src={loading} alt="loading" />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    groupBooks: state.groupBooks
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { makeOrGetUser, fetchGroupBooks }
  )(UserInfoRefactor)
);
