import React from "react";
import { connect } from "react-redux";
import { makeOrGetUser } from "../redux/actions";
import { Layout, Row, Col, Tabs } from "antd";
import BookSearch from "../components/BookSearch";
import ResultsContainer from "./ResultsContainer";
import BestsellersContainer from "./BestsellersContainer";

const { Content } = Layout;

class BooksContainer extends React.Component {
  componentDidMount() {
    if (this.props.auth.userProfile) {
      this.props.makeOrGetUser(this.props.auth.userProfile);
    }
  }

  render() {
    let height = window.innerHeight - 50;

    return (
      <Content
        style={{ minHeight: height, backgroundColor: "rgb(238, 240, 243)" }}
      >
        {this.props.auth.userProfile ? (
          <Tabs defaultActiveKey="2">
            <Tabs.TabPane tab="Browse bestsellers" key="1">
              <BestsellersContainer />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Search for books" key="2">
              <Row type="flex" justify="space-around">
                <Col span="20">
                  <BookSearch />
                </Col>
              </Row>
              <ResultsContainer history={this.props.history} />
            </Tabs.TabPane>
          </Tabs>
        ) : (
          this.props.history.push("/")
        )}
      </Content>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(
  mapStateToProps,
  { makeOrGetUser }
)(BooksContainer);
