import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPodcasts } from '../actions/podcastActions';
import { updateUser } from '../actions/userActions';
import SearchBar from '../components/SearchBar';
import PodcastList from '../components/PodcastList';

class Explore extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(searchTerm) {
    const { handleSearch } = this.props;
    handleSearch(searchTerm);
  }

  render() {
    const { foundPodcasts, savedPodcasts, togglePodcastOnUser } = this.props;
    const savedPodcastsIds = savedPodcasts.map(p => p.collectionId);
    return (
      <div>
        <SearchBar handleSearch={this.handleSearch} />
        <PodcastList
          podcasts={foundPodcasts}
          savedPodcastsIds={savedPodcastsIds}
          togglePodcastOnUser={togglePodcastOnUser}
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
  togglePodcastOnUser: PropTypes.func.isRequired,
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
    togglePodcastOnUser: podcast => dispatch(updateUser(podcast)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
