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
      <Form onSubmit={e => this.handleSubmit(e)} style={{ marginTop: "20%" }}>
        <Form.Item>
          <Input.Search
            placeholder="Search for books"
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
