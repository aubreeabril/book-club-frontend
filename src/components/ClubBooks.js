import React from "react";
import { connect } from "react-redux";
import { createVote } from "../redux/actions";
import { List, Avatar, Button } from "antd";

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
    return (
      <div>
        <h2>Vote for a book</h2>
        <List>
          {this.props.groupBooks
            .filter(gb => gb.group_id === this.props.club.id)
            .map(book => (
              <List.Item
                key={book.id}
                actions={[
                  this.props.currentUser.votes
                    .map(v => v.group_book_id)
                    .includes(book.id) ? (
                    <Button id={book.id} disabled onClick={this.handleClick}>
                      Vote
                    </Button>
                  ) : (
                    <Button id={book.id} onClick={this.handleClick}>
                      Vote
                    </Button>
                  )
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={book.image} />}
                  title={book.title}
                  description={`Votes: ${book.votes ? book.votes.length : "0"}`}
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
