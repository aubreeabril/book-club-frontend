import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeOrGetUser, createGroup, createUserGroup } from "../redux/actions";
import {
  Card,
  Layout,
  Collapse,
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Avatar,
  List
} from "antd";
const { Content } = Layout;
const Panel = Collapse.Panel;

class UserInfo extends React.Component {
  state = {
    nameValue: "",
    selectedGroupId: null,
    user: ""
  };

  componentDidMount() {
    this.props.makeOrGetUser(this.props.user);
  }

  handleChange = e => {
    this.setState({
      nameValue: e.target.value
    });
  };

  handleSelectChange = (value, event) => {
    this.setState({
      selectedGroupId: event.key
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createGroup(this.state.nameValue);
    this.setState({
      nameValue: ""
    });
  };

  handleSelectSubmit = e => {
    e.preventDefault();
    console.log(this.state.selectedGroupId, this.props.currentUser.id);
    this.props.createUserGroup(
      this.state.selectedGroupId,
      this.props.currentUser.id
    );
  };

  render() {
    return (
      <Content style={{ margin: "1em" }}>
        <Row>
          <Col span={12}>
            <Card title={this.props.currentUser.name}>
              <Avatar src={this.props.currentUser.picture} />
            </Card>
          </Col>
          <Col span={12}>
            <div style={{ margin: "1em" }}>
              <h3>My Clubs</h3>
              {this.props.currentUser.groups ? (
                <div>
                  {this.props.currentUser.groups.map(group => (
                    <p>
                      <Link to={`/club/${group.id}`} key={group.id}>
                        {group.name}
                      </Link>
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          </Col>
        </Row>
        <Collapse accordion style={{ margin: "1em" }}>
          <Panel header="Join a book club" key="1">
            <Form onSubmit={this.handleSelectSubmit}>
              <Form.Item>
                <Select
                  placeholder="Select a club"
                  onChange={this.handleSelectChange}
                >
                  {this.props.groups.map(group => (
                    <Select.Option value={group.name} key={group.id}>
                      {group.name}
                    </Select.Option>
                  ))}
                </Select>
                <Button htmlType="submit">Join</Button>
              </Form.Item>
            </Form>
          </Panel>
          <Panel header="Create new book club" key="2">
            <Form onSubmit={this.handleSubmit} layout="inline">
              <Form.Item>
                <Input
                  placeholder="group name"
                  value={this.state.nameValue}
                  onChange={this.handleChange}
                />
                <Button htmlType="submit">Create</Button>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>
        <h3 style={{ "margin-top": "1em" }}>My Saved Books</h3>
        <List>
          {this.props.currentUser.user_books
            ? this.props.currentUser.user_books.map(book => (
                <List.Item key={book.isbn}>
                  <List.Item.Meta
                    avatar={<Avatar src={book.image} />}
                    title={book.title}
                    description={book.author}
                  />
                </List.Item>
              ))
            : null}
        </List>
      </Content>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    makeOrGetUser: user => dispatch(makeOrGetUser(user)),
    createGroup: name => dispatch(createGroup(name)),
    createUserGroup: (groupId, userId) =>
      dispatch(createUserGroup(groupId, userId))
  };
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    groups: state.groups
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);
