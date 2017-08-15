import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPodcasts, addPodcast, removePodcast } from '../actions/podcastActions';
import { updateUser } from '../actions/userActions';
import SearchBar from '../components/SearchBar';
import PodcastList from '../components/PodcastList';

class Explore extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.savePodcast = this.savePodcast.bind(this);
    this.removePodcast = this.removePodcast.bind(this);
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
    return (
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
    );
  }
}

Explore.propTypes = {
  foundPodcasts: PropTypes.array.isRequired,
  savedPodcasts: PropTypes.array.isRequired,
  handleSearch: PropTypes.func.isRequired,
  removeFromCollection: PropTypes.func.isRequired,
  addToCollection: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const {
      explorePodcasts: { foundPodcasts = [], isFetching = false },
      savedPodcasts,
  } = state;
  return { foundPodcasts, isFetching, savedPodcasts };
};

const mapDispatchToProps = dispatch => (
  {
    handleSearch: searchTerm => dispatch(fetchPodcasts(searchTerm)),
    addToCollection: podcast => dispatch(updateUser(podcast.collectionId)),
    removeFromCollection: podcast => dispatch(removePodcast(podcast.collectionId)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
