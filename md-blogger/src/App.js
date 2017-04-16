import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {randomTitle} from './helper'


class Title extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.handleTitleChange(randomTitle());
  }

  componentDidMount() {
    this.handleChange();
  }

  componentWillUnmount() {
  }

  render() {
    const title = this.props.title;
    return (
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>{title}</h2>
      </div>
    );
  }
}


class RandomTitle extends Component {

  constructor(props) {
    super(props);
    this.changeTitle = this.changeTitle.bind(this);
  }

  changeTitle (title) {
    this.props.handleTitleChange(randomTitle());
  }

  render() {
    return (
      <button onClick={this.changeTitle}>press me</button>
    );
  }
}



class App extends Component {

  constructor() {
    super();
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.state = {title: 'React'};
  }

  handleTitleChange(title) {
    this.setState({ title });
  }

  render() {
    return (
      <div className="App">
        <Title title={this.state.title} handleTitleChange={this.handleTitleChange} />
        <RandomTitle title={this.state.title} handleTitleChange={this.handleTitleChange} />
      </div>
    );
  }
}

export default App;
