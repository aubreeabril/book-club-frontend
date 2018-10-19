import React, { Fragment } from "react";
import { connect } from "react-redux";
import { makeOrGetUser } from "../redux/actions";
import { Layout, Row, Col } from "antd";
import BookSearch from "../components/BookSearch";
import ResultsContainer from "./ResultsContainer";

const { Content } = Layout;

class BooksContainer extends React.Component {
  componentDidMount() {
    if (this.props.auth.userProfile) {
      this.props.makeOrGetUser(this.props.auth.userProfile);
    }
  }

  render() {
    return (
      <Content>
        {this.props.auth.userProfile ? (
          <Fragment>
            <Row type="flex" justify="space-around">
              <Col span="20">
                <BookSearch />
              </Col>
            </Row>
            <ResultsContainer history={this.props.history} />
          </Fragment>
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
