import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { fetchPodcasts } from '../actions';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import Nav from '../components/Nav';
import PodcastList from '../components/PodcastList';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(searchTerm) {
    const { handleSearch } = this.props;
    handleSearch(searchTerm);
  }

  render() {
    const { foundPodcasts, savedPodcasts } = this.props;
    return (<div className="wrapper">
      <Header />
      <Nav />
      <Route
        exact
        path="/explore"
        render={() => (
          <div>
            <SearchBar handleSearch={this.handleSearch} />
            <PodcastList podcasts={foundPodcasts} onClick={this.handleSearch} />
          </div>
        )}
      />
      <Route
        exact
        path="/mine"
        render={() => (<PodcastList podcasts={savedPodcasts} onClick={this.handleSearch} />)}
      />
    </div>
    );
  }
}

App.propTypes = {
  foundPodcasts: PropTypes.array.isRequired,
  handleSearch: PropTypes.func.isRequired,
  savedPodcasts: PropTypes.array.isRequired,
};


const mapStateToProps = (state) => {
  const { explorePodcasts: { foundPodcasts = [], isFetching = false }, savedPodcasts } = state;
  return {
    foundPodcasts,
    isFetching,
    savedPodcasts,
  };
};

const mapDispatchToProps = dispatch => (
  {
    handleSearch: searchTerm => dispatch(fetchPodcasts(searchTerm)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
