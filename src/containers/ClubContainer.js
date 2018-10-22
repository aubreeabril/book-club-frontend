import React from "react";
import { connect } from "react-redux";
import {
  fetchGroupBooks,
  setCurrentGroup,
  fetchMessages
} from "../redux/actions";
import ClubInfo from "../components/ClubInfo";
import { Layout, Drawer, Button } from "antd";
import Chat from "../components/Chat";

class ClubContainer extends React.Component {
  state = {
    visible: false
  };

  componentDidMount() {
    const club = this.props.groups.find(
      g => g.id === parseInt(this.props.match.params.id, 10)
    );
    if (club) {
      this.props.fetchMessages(club.id);
    }
    // this.props.fetchMessages(club.id);
    // this.props.fetchGroupBooks();
  }

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  handleClick = () => {
    this.setState({
      visible: true
    });
  };

  render() {
    const club = this.props.groups.find(
      g => g.id === parseInt(this.props.match.params.id, 10)
    );
    // this.props.fetchMessages(club.id);

    return (
      <Layout style={{ padding: "1em" }}>
        {club ? (
          <React.Fragment>
            <h1>
              {club.name}
              <Button onClick={this.handleClick} style={{ float: "right" }}>
                Chat
              </Button>
              <Drawer
                title="Chat"
                placement="right"
                visible={this.state.visible}
                onClose={this.onClose}
              >
                <Chat club={club} chatMessages={this.props.chatMessages} />
              </Drawer>
            </h1>
            <ClubInfo club={club} currentUser={this.props.currentUser} />
          </React.Fragment>
        ) : (
          this.props.history.push("/dashboard")
        )}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    groups: state.groups,
    currentUser: state.currentUser,
    currentGroup: state.currentGroup,
    chatMessages: state.chatMessages
  };
};

export default connect(
  mapStateToProps,
  { setCurrentGroup, fetchGroupBooks, fetchMessages }
)(ClubContainer);
