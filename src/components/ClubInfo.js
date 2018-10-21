import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import moment from "moment";
import { setMeeting, addGroupBook, setClubBook } from "../redux/actions";
import {
  Layout,
  DatePicker,
  Form,
  Select,
  Button,
  Alert,
  List,
  Card,
  Avatar
} from "antd";
import ClubMembers from "./ClubMembers";
import ClubBooks from "./ClubBooks";
// import { ActionCable } from "react-actioncable-provider";
// import Cable from "./Cable";

class ClubInfo extends React.Component {
  state = {
    meeting: null,
    selectedBook: null,
    vote_by: null
  };

  componentDidMount() {
    // handling meeting date and vote by date
    if (this.props.club.next_meeting) {
      this.setState({
        meeting: moment(this.props.club.next_meeting).format(
          "dddd, MMM DD, hh:mm a"
        ),
        vote_by: moment(this.props.club.vote_by).format("dddd, MMM DD, hh:mm a")
      });
    }
    // is there a winning book?
    const winningBook = this.props.groupBooks.find(
      b => b.id === parseInt(this.props.club.current_book, 10)
    );
    this.setState({
      selectedBook: winningBook
    });

    // if there's no winning book && the vote_by date has passed, find the winning book

    if (!winningBook && moment() > moment(this.props.club.vote_by)) {
      let votes = this.props.club.votes.map(vote => vote.group_book_id);

      let count = votes.reduce((tallyObj, vote) => {
        tallyObj[vote] = (tallyObj[vote] || 0) + 1;
        return tallyObj;
      }, {});

      let numOfWinningVotes = Math.max(...Object.values(count));
      let bookId = Object.keys(count, numOfWinningVotes).find(
        key => count[key] === numOfWinningVotes
      );

      let newWinningBook = this.props.groupBooks.find(
        gb => gb.id === parseInt(bookId)
      );

      console.log(newWinningBook);

      // this.setState({
      //   selectedBook: this.props.newWinningBook
      // });
      this.props.setClubBook(this.props.club.id, newWinningBook.id);
    }
  }

  handleChange = (value, event) => {
    this.setState({
      selectedBook: {
        title: event.props.title,
        author: event.props.author,
        isbn: event.props.isbn,
        image: event.props.image,
        description: event.props.description,
        link: event.props.link
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (
      !this.props.groupBooks
        .map(gb => gb.isbn)
        .includes(this.state.selectedBook.isbn)
    ) {
      this.props.addGroupBook(this.props.club.id, this.state.selectedBook);
    } else {
      ReactDOM.render(
        <Alert
          closable
          type="error"
          message="This book has already been nominated"
        />,
        document.getElementById("for-error")
      );
    }
  };

  handleOk = value => {
    let meeting = value;
    let voteBy = moment(value).subtract(1, "months");
    console.log(meeting, voteBy);
    this.setState({
      meeting: moment(value).format("dddd, MMM DD, hh:mm a"),
      vote_by: moment(value)
        .subtract(1, "months")
        .format("dddd, MM DD, hh:mm a")
    });
    this.props.setMeeting(this.props.club.id, meeting, voteBy);
  };

  render() {
    const { club, currentUser } = this.props;

    const winningBook = this.props.groupBooks.find(
      b => b.id === parseInt(club.current_book, 10)
    );

    // if (!winningBook) {
    //   console.log(this.props.club);
    //
    // }

    return (
      <Layout.Content>
        <List>
          <List.Item>
            <List.Item.Meta
              title="Next Meeting"
              description={
                !!this.state.meeting ? (
                  this.state.meeting
                ) : (
                  <DatePicker
                    placeholder="pick date and time"
                    showTime={{ format: "hh:mm" }}
                    format="YYYY-MM-DD hh:mm"
                    onOk={this.handleOk}
                  />
                )
              }
            />
            {!club.current_book && this.state.vote_by ? (
              <p>Vote or nominate a book by {this.state.vote_by}!</p>
            ) : null}
          </List.Item>
          <List.Item
            actions={[
              <a href={winningBook.link} target="_blank">
                Buy
              </a>
            ]}
          >
            {!!club.current_book && this.props.groupBooks ? (
              <List.Item.Meta
                title={!!club.current_book ? winningBook.title : "Current Book"}
                avatar={<Avatar src={winningBook.image} />}
              />
            ) : (
              <Form onSubmit={this.handleSubmit}>
                <Select
                  placeholder="nominate a book"
                  onChange={this.handleChange}
                  defaultValue="nominate a book"
                >
                  {currentUser.user_books
                    ? currentUser.user_books.map(book => (
                        <Select.Option
                          title={book.title}
                          author={book.author}
                          image={book.image}
                          description={book.description}
                          link={book.link}
                          isbn={book.isbn}
                          key={book.isbn}
                        >
                          {book.title}
                        </Select.Option>
                      ))
                    : null}
                </Select>
                <Button htmlType="submit">Submit</Button>
                <div id="for-error" />
              </Form>
            )}
          </List.Item>
        </List>

        <ClubMembers club={club} {...this.props} />
        <ClubBooks club={club} />
      </Layout.Content>
    );
  }
}

const mapStateToProps = state => {
  return {
    groupBooks: state.groupBooks
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { setMeeting, addGroupBook, setClubBook }
  )(ClubInfo)
);
