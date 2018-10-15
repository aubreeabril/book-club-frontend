import React from "react";
import { connect } from "react-redux";
import ClubInfo from "../components/ClubInfo";
import { Layout } from "antd";

class ClubContainer extends React.Component {
  render() {
    const club = this.props.groups.find(
      g => g.id === parseInt(this.props.match.params.id, 10)
    );
    return (
      <Layout style={{ padding: "1em" }}>
        <h1>{club.name}</h1>
        <ClubInfo club={club} currentUser={this.props.currentUser} />
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

export default connect(mapStateToProps)(ClubContainer);
