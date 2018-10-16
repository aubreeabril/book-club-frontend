import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { makeOrGetUser, fetchGroupBooks } from "../redux/actions";
import ProfileCard from "./ProfileCard";
import ProfileClubs from "./ProfileClubs";
import ProfileCollapse from "./ProfileCollapse";
import ProfileBooks from "./ProfileBooks";
import { Layout, Row, Col } from "antd";

const Content = Layout;

class UserInfoRefactor extends React.Component {
  componentDidMount() {
    this.props.makeOrGetUser(this.props.user);
    this.props.fetchGroupBooks();
  }

  render() {
    return (
      <Content style={{ margin: "1em" }}>
        <Row>
          <Col span={12}>
            <ProfileCard />
          </Col>
          <Col span={12}>
            <ProfileClubs />
          </Col>
        </Row>
        <ProfileCollapse />

        <ProfileBooks />
      </Content>
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
