import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { initialize, addPodcast, removePodcast, fetchPodcasts } from '../actions';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import Nav from '../components/Nav';
import PodcastList from '../components/PodcastList';
import EpisodesList from '../components/EpisodesList';
import Register from '../containers/Register';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.savePodcast = this.savePodcast.bind(this);
    this.removePodcast = this.removePodcast.bind(this);
  }

  componentDidMount() {
    const { savedPodcasts, init } = this.props;
    const feedUrl = savedPodcasts[0].feedUrl;
    init('P3', feedUrl);
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
    const { foundPodcasts, savedPodcasts, episodes } = this.props;
    const savedPodcastsIds = savedPodcasts.map(p => p.collectionId);
    return (<div>
      <div className="header">
        <Header />
        <Nav />
      </div>
      <div className="wrapper">
        <Route exact path="/" render={() => (<Redirect to="/explore" push />)} />
        <Route exact path="/register" render={() => (<Register />)} />
        <Route
          exact
          path="/feed"
          render={() => (
            <EpisodesList
              episodes={episodes}
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
  episodes: PropTypes.array.isRequired,
  init: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const {
    episodes: { episodes },
    explorePodcasts: { foundPodcasts = [], isFetching = false },
    savedPodcasts,
  } = state;
  return {
    foundPodcasts,
    isFetching,
    savedPodcasts,
    episodes,
  };
};

const mapDispatchToProps = dispatch => (
  {
    handleSearch: searchTerm => dispatch(fetchPodcasts(searchTerm)),
    addToCollection: podcast => dispatch(addPodcast(podcast)),
    removeFromCollection: podcast => dispatch(removePodcast(podcast.collectionId)),
    init: (searchTerm, feedUrl) => dispatch(initialize(searchTerm, feedUrl)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
