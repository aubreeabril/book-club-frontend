import React from "react";
import { connect } from "react-redux";
import { createVote } from "../redux/actions";
import { List, Avatar, Icon, Button } from "antd";

class ClubBooks extends React.Component {
  state = {
    update: false
  };

  handleClick = e => {
    this.props.createVote(this.props.currentUser.id, e.target.id);
    this.setState({
      update: true
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <h2>Vote for a book</h2>
        <List>
          {this.props.club.group_books.map(book => (
            <List.Item
              key={book.id}
              actions={[
                <Button id={book.id} onClick={this.handleClick}>
                  Vote
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={book.image} />}
                title={book.title}
                description={`Votes: ${
                  this.props.club.votes.filter(v => v.group_book_id === book.id)
                    ? this.props.club.votes.filter(
                        v => v.group_book_id === book.id
                      ).length
                    : "0"
                }`}
              />
            </List.Item>
          ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    groupBooks: state.groupBooks,
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { createVote }
)(ClubBooks);
