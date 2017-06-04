import React, { Component } from 'react';
import Header from './Header';
import PodcastList from './PodcastList';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      podcasts: []
    }
  }
  
  componentDidMount() {
    fetch('http://localhost:8080/podcasts')
      .then(res => res.json())
      .then(res => this.setState({podcasts: res}));
  }

  render () {
    return (
      <div className="wrapper">
        <Header/>
        <PodcastList podcasts={this.state.podcasts}/>
      </div>
    )
  };
};

export default App;