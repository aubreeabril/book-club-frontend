import React from "react";
import { Form, Input } from "antd";
import { connect } from "react-redux";
import { getBooks } from "../redux/actions";

class BookSearch extends React.Component {
  state = {
    searchValue: ""
  };

  handleChange = e => {
    this.setState({
      searchValue: e.target.value
    });
  };

  handleSubmit = value => {
    console.log(value);
    this.props.getBooks(value);
    this.setState({
      searchValue: ""
    });
  };

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <Form.Item>
          <Input.Search
            placeholder="Find a book by title"
            enterButton
            onChange={this.handleChange}
            onSearch={value => this.handleSubmit(value)}
            value={this.state.searchValue}
          />
        </Form.Item>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBooks: searchValue => dispatch(getBooks(searchValue))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(BookSearch);
