import axios from 'axios';
import React, { Component } from 'react';
export default class IndexPage extends Component {
  state = {
    response: {},
  };
  params = {
    where: {
      territoryType: "USSTATE",
    }
  };
  async componentDidMount() {
    axios.get('/api/case-numbers/?filter=' + JSON.stringify(this.params)).then(res => {
      const response = res.data
      this.setState({ response });
    })
  }
  render() {
    return (
      <div>
        <p>Welcome to next.js!</p>
        <p>{JSON.stringify(this.state.response[0])}</p>
      </div>
    );
  }
}
