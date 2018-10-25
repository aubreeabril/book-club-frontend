import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List } from "antd";

class ProfileClubs extends React.Component {
  render() {
    return (
      <div style={{ margin: "1em" }}>
        <h2>My Book Clubs</h2>
        {this.props.currentUser.groups ? (
          <List>
            {this.props.currentUser.groups.map(group => (
              <List.Item key={group.id}>
                <List.Item.Meta
                  title={
                    <Link to={`/club/${group.id}`} key={group.id}>
                      {group.name}
                    </Link>
                  }
                  // description={
                  //   group.current_book
                  //     ? group.group_books.find(gb => gb.id === current_book)
                  //         .title
                  //     : null
                  // }
                />
              </List.Item>
            ))}
          </List>
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
