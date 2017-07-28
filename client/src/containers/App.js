import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { addPodcast, removePodcast, fetchPodcasts } from '../actions';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import Nav from '../components/Nav';
import PodcastList from '../components/PodcastList';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.addToCollection = this.addToCollection.bind(this);
    this.removeFromCollection = this.removeFromCollection.bind(this);
  }

  handleSearch(searchTerm) {
    const { handleSearch } = this.props;
    handleSearch(searchTerm);
  }

  addToCollection(podcast) {
    const { addToCollection } = this.props;
    addToCollection(podcast);
  }

  removeFromCollection(podcast) {
    const { removeFromCollection } = this.props;
    removeFromCollection(podcast);
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
            <PodcastList
              podcasts={foundPodcasts}
              onClick={this.addToCollection}
            />
          </div>
        )}
      />
      <Route
        exact
        path="/mine"
        render={() => (
          <PodcastList
            podcasts={savedPodcasts}
            onClick={this.removeFromCollection}
          />)}
      />
    </div>
    );
  }
}

App.propTypes = {
  foundPodcasts: PropTypes.array.isRequired,
  handleSearch: PropTypes.func.isRequired,
  savedPodcasts: PropTypes.array.isRequired,
  addToCollection: PropTypes.func.isRequired,
  removeFromCollection: PropTypes.func.isRequired,
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
    addToCollection: podcast => dispatch(addPodcast(podcast)),
    removeFromCollection: podcast => dispatch(removePodcast(podcast.collectionId)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
