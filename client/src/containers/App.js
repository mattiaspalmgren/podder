import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { addPodcast, removePodcast, fetchPodcasts, fetchEpisodes } from '../actions';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import Nav from '../components/Nav';
import PodcastList from '../components/PodcastList';
import EpisodesList from '../components/EpisodesList';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.savePodcast = this.savePodcast.bind(this);
    this.removePodcast = this.removePodcast.bind(this);
  }

  componentDidMount() {
    const { handleSearch } = this.props;
    handleSearch('P3');
  }

  handleSearch(searchTerm) {
    const { handleSearch } = this.props;
    handleSearch(searchTerm);
  }

  savePodcast(podcast) {
    const { addToCollection } = this.props;
    addToCollection(podcast);
  }

  removePodcast(podcast) {
    const { removeFromCollection } = this.props;
    removeFromCollection(podcast);
  }

  render() {
    const { foundPodcasts, savedPodcasts } = this.props;
    const savedPodcastsIds = savedPodcasts.map(p => p.collectionId);
    const savedPodcastsUrls = savedPodcasts.map(p => p.feedUrl);
    return (<div>
      <div className="header">
        <Header />
        <Nav />
      </div>
      <div className="wrapper">
        <Route path="/" render={() => (<Redirect to="/explore" push />)} />
        <Route
          exact
          path="/feed"
          render={() => (
            <EpisodesList
              savedPodcastsUrls={savedPodcastsUrls}
              {...this.props}
            />)}
        />
        <Route
          exact
          path="/explore"
          render={() => (
            <div>
              <SearchBar handleSearch={this.handleSearch} />
              <PodcastList
                podcasts={foundPodcasts}
                savedPodcastsIds={savedPodcastsIds}
                savePodcast={this.savePodcast}
                removePodcast={this.removePodcast}
                {...this.props}
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
              savedPodcastsIds={savedPodcastsIds}
              savePodcast={this.savePodcast}
              removePodcast={this.removePodcast}
              {...this.props}
            />)}
        />
      </div>
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
    getEpisodes: feedUrl => dispatch(fetchEpisodes(feedUrl)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
