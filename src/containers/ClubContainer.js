import React from "react";
import { connect } from "react-redux";
import { getGroups, fetchGroupBooks } from "../redux/actions";
import ClubInfo from "../components/ClubInfo";
import { Layout, Icon, Drawer, Button } from "antd";
import loading from "../Callback/loading.svg";
import Chat from "../components/Chat";

class ClubContainer extends React.Component {
  state = {
    visible: false
  };

  componentDidMount() {
    this.props.getGroups();
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

    const style = {
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      top: "50%",
      left: 0,
      right: 0,
      backgroundColor: "white"
    };

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
                placement="bottom"
                visible={this.state.visible}
                onClose={this.onClose}
              >
                <Chat />
              </Drawer>
            </h1>
            <ClubInfo club={club} currentUser={this.props.currentUser} />
          </React.Fragment>
        ) : (
          <Icon type="loading" theme="outlined" style={style} />
        )}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    groups: state.groups,
    currentUser: state.currentUser
  };
};

export default connect(
  mapStateToProps,
  { getGroups, fetchGroupBooks }
)(ClubContainer);
