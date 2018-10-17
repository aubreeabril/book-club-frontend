import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ProfileClubs extends React.Component {
  render() {
    return (
      <div style={{ margin: "1em" }}>
        <h3>My Clubs</h3>
        {this.props.currentUser.groups ? (
          <div>
            {this.props.currentUser.groups.map(group => (
              <p key={group.id}>
                <Link to={`/club/${group.id}`} key={group.id}>
                  {group.name}
                </Link>
              </p>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(ProfileClubs);
