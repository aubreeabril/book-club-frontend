import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import moment from "moment";
import { setMeeting, addGroupBook } from "../redux/actions";
import { Layout, DatePicker, Form, Select, Button } from "antd";
import ClubMembers from "./ClubMembers";
import ClubBooks from "./ClubBooks";

class ClubInfo extends React.Component {
  state = {
    meeting: null,
    selectedBook: null
  };

  componentDidMount() {
    if (this.props.club.next_meeting) {
      this.setState({
        meeting: moment(this.props.club.next_meeting).format(
          "dddd, MMM DD, hh:mm a"
        )
      });
    }
  }

  handleChange = (value, event) => {
    this.setState({
      selectedBook: {
        title: event.props.title,
        author: event.props.author,
        isbn: event.props.isbn,
        image: event.props.image
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addGroupBook(this.props.club.id, this.state.selectedBook);
  };

  handleOk = value => {
    let meeting = value;
    this.setState({
      meeting: moment(value).format("dddd, MMM DD, hh:mm a")
    });
    this.props.setMeeting(this.props.club.id, meeting);
  };

  render() {
    const { club, currentUser } = this.props;
    const meetingDate = new Date(club.next_meeting);
    const meetingDateMoment = moment(meetingDate).format(
      "dddd, MMM DD, hh:mm a"
    );

    const winningBook = this.props.groupBooks.find(
      b => b.id === parseInt(club.current_book, 10)
    );

    return (
      <Layout.Content>
        <h3>
          Next Meeting:{" "}
          {!!this.state.meeting ? (
            this.state.meeting
          ) : (
            <DatePicker
              placeholder="pick date and time"
              showTime={{ format: "hh:mm" }}
              format="YYYY-MM-DD hh:mm"
              onOk={this.handleOk}
            />
          )}
        </h3>
        <h3>
          Current Book:{" "}
          {!!club.current_book && this.props.groupBooks ? (
            winningBook.title
          ) : (
            <Form onSubmit={this.handleSubmit}>
              <Select
                placeholder="nominate a book"
                onChange={this.handleChange}
              >
                {currentUser.user_books
                  ? currentUser.user_books.map(book => (
                      <Select.Option
                        title={book.title}
                        author={book.author}
                        image={book.image}
                        isbn={book.isbn}
                        key={book.isbn}
                      >
                        {book.title}
                      </Select.Option>
                    ))
                  : null}
              </Select>
              <Button htmlType="submit">Submit</Button>
            </Form>
          )}
        </h3>
        <ClubMembers club={club} {...this.props} />
        <ClubBooks {...this.props} />
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
    { setMeeting, addGroupBook }
  )(ClubInfo)
);
