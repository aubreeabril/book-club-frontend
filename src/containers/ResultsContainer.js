import React from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import BookCard from "../components/BookCard";

const { Content } = Layout;

class ResultsContainer extends React.Component {
  render() {
    return (
      <Content style={{ margin: "5%" }}>
        {this.props
          ? this.props.booksFromSearch.map(book => <BookCard book={book} />)
          : null}
      </Content>
    );
  }
}

const mapStateToProps = state => {
  return {
    booksFromSearch: state.booksFromSearch
  };
};

export default connect(mapStateToProps)(ResultsContainer);
