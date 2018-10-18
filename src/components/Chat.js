import React from "react";
import { connect } from "react-redux";
import { Input, Button, List, Avatar } from "antd";
import { createMessage, fetchMessages } from "../redux/actions";

class Chat extends React.Component {
  state = {
    inputValue: ""
  };

  componentDidMount() {}

  handleChange = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  handleClick = () => {
    this.props.createMessage(
      this.props.currentUser.id,
      this.props.club.id,
      this.state.inputValue
    );

    this.setState({
      inputValue: ""
    });
  };

  render() {
    this.props.fetchMessages(this.props.club.id);
    return (
      <div>
        <h3>Chat</h3>
        {this.props.chatMessages.length > 1 ? (
          <React.Fragment>
            <List style={{ elementOverflow: "hidden" }}>
              {this.props.chatMessages
                ? this.props.chatMessages.map(message => (
                    <React.Fragment>
                      <List.Item
                        key={message.id}
                        style={
                          message.user_id === this.props.currentUser.id
                            ? { float: "right" }
                            : null
                        }
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              src={
                                this.props.users.find(
                                  u => u.id === message.user_id
                                ).picture
                              }
                            />
                          }
                          description={message.text}
                        />
                      </List.Item>
                      <div style={{ clear: "both" }} />
                    </React.Fragment>
                  ))
                : null}
            </List>

            <Input
              placeholder="type something"
              value={this.state.inputValue}
              onChange={this.handleChange}
            />
            <Button onClick={this.handleClick}>Send</Button>
          </React.Fragment>
        ) : (
          "Loading ..."
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    chatMessages: state.chatMessages,
    currentGroup: state.currentGroup,
    currentUser: state.currentUser,
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { createMessage, fetchMessages }
)(Chat);
