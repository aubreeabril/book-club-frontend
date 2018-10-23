import React from "react";
import { connect } from "react-redux";
import { List, Button, Modal } from "antd";
import {
  fetchBestsellers,
  fetchBestsellerFromGoogle,
  clearBestsellers
} from "../redux/actions";

class BestsellerList extends React.Component {
  state = {
    books: this.props.bestsellers
  };

  componentDidMount() {
    this.props.fetchBestsellers(this.props.list);
  }

  handleClick = e => {
    this.showConfirm();
    // console.log(this.props.currentUser);
    this.props.fetchBestsellerFromGoogle(
      this.props.currentUser.id,
      e.target.id
    );
  };

  showConfirm = () => {
    Modal.confirm({ title: "This book has been saved" });
  };

  // componentDidUpdate() {
  //   this.props.fetchBestsellers(this.props.list);
  // }

  makeList = () => {
    return (
      <List itemLayout="vertical">
        {this.state.books.map(book => (
          <List.Item
            key={book.book_details[0].primary_isbn10}
            actions={[
              <Button
                onClick={this.handleClick}
                id={book.book_details[0].primary_isbn10}
              >
                Save
              </Button>
            ]}
          >
            <List.Item.Meta
              title={book.book_details[0].title}
              description={book.book_details[0].author}
            />
            {book.book_details[0].description}
          </List.Item>
        ))}
      </List>
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.props.bestsellers ? this.makeList() : "Loading ..."}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    bestsellers: state.bestsellers,
    currentUser: state.currentUser
  };
};

export default connect(
  mapStateToProps,
  { fetchBestsellers, fetchBestsellerFromGoogle, clearBestsellers }
)(BestsellerList);
