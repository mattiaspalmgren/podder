import React, { Component } from 'react';
import fetchjsonp from 'fetch-jsonp';
import Header from './Header';

// import SearchBar from './SearchBar';
import Main from './Main';

class App extends Component {
  constructor (props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.fetchPodcasts = this.fetchPodcasts.bind(this);
    this.state = {
      podcasts: []
    }
  }
  
  componentDidMount() {
    this.fetchPodcasts();
  }
  
  fetchPodcasts () {
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
        <Header />
        <Main 
          podcasts={this.state.podcasts}
          handleSearch={this.handleSearch} 
        />
      </div>
    )
  };
};

export default App;