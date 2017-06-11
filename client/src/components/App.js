import React, { Component } from 'react';
import fetchjsonp from 'fetch-jsonp';
import Header from './Header';
import PodcastList from './PodcastList';
import SearchBar from './SearchBar';

class App extends Component {
  constructor (props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      podcasts: []
    }
  }
  
  componentDidMount() {
    fetch('http://localhost:8080/podcasts')
      .then(res => res.json())
      .then(res => this.setState({podcasts: res}));
  }

  handleSearch(value) {
    fetchjsonp(`https://itunes.apple.com/search?media=podcast&limit=30&entity=podcast&term='${value}'`)
      .then(res => res.json())
      .then(res => this.setState({podcasts: res.results}))
  }

  render () {
    return (
      <div className="wrapper">
        <Header/>
        <SearchBar handleSearch={this.handleSearch}/>
        <PodcastList podcasts={this.state.podcasts}/>
      </div>
    )
  };
};

export default App;