import React from "react";
import { Layout, Row, Col } from "antd";
import BookSearch from "../components/BookSearch";
import ResultsContainer from "./ResultsContainer";

const { Content } = Layout;

class BooksContainer extends React.Component {
  render() {
    return (
      <Content>
        <Row type="flex" justify="space-around" align="middle">
          <Col span="20">
            <BookSearch />
          </Col>
        </Row>
        <ResultsContainer />
      </Content>
    );
  }
}

export default BooksContainer;
