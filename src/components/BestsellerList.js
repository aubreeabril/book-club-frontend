import React from "react";
import { connect } from "react-redux";
import { List, Button } from "antd";
import { fetchBestsellers } from "../redux/actions";

class HardcoverFiction extends React.Component {
  componentDidMount() {
    this.props.fetchBestsellers(this.props.list);
  }

  makeList = () => {
    return (
      <List itemLayout="vertical">
        {this.props.bestsellers.map(book => (
          <List.Item
            actions={[
              <Button id={book.book_details[0].primary_isbn13}>Save</Button>
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
    bestsellers: state.bestsellers
  };
};

export default connect(
  mapStateToProps,
  { fetchBestsellers }
)(HardcoverFiction);
