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
          ? this.props.booksFromSearch.map(book => (
              <BookCard
                currentUser={this.props.currentUser}
                book={book}
                history={this.props.history}
                key={book.volumeInfo.title}
              />
            ))
          : null}
      </Content>
    );
  }
}

const mapStateToProps = state => {
  return {
    booksFromSearch: state.booksFromSearch,
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(ResultsContainer);
