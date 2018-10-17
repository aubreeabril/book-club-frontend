import React from "react";
import { connect } from "react-redux";
import { Input, Button, List } from "antd";
import { createMessage, fetchMessages } from "../redux/actions";

class Chat extends React.Component {
  state = {
    inputValue: ""
  };

  componentDidMount() {
    this.props.fetchMessages();
  }

  handleChange = event => {
    console.log(event.target.value);
    this.setState({
      inputValue: event.target.value
    });
  };

  handleClick = () => {
    this.props.createMessage(
      this.props.currentUser.id,
      this.props.currentGroup,
      this.state.inputValue
    );
  };

  render() {
    return (
      <div>
        <h3>Chat</h3>
        {this.props.chatMessages.length > 1 ? (
          <React.Fragment>
            <List>
              {this.props.chatMessages
                ? this.props.chatMessages.map(message => (
                    <List.Item>{message.text}</List.Item>
                  ))
                : null}
            </List>

            <Input placeholder="type something" onChange={this.handleChange} />
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
    currentUser: state.currentUser
  };
};

export default connect(
  mapStateToProps,
  { createMessage, fetchMessages }
)(Chat);
