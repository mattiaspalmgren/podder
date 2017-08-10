import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removePodcast } from '../actions';
import PodcastList from '../components/PodcastList';
import Header from '../components/Header';

class Mine extends Component {
  constructor(props) {
    super(props);
    this.removePodcast = this.removePodcast.bind(this);
  }

  removePodcast(podcast) {
    const { removeFromCollection } = this.props;
    removeFromCollection(podcast);
  }

  render() {
    const { savedPodcasts } = this.props;
    const savedPodcastsIds = savedPodcasts.map(p => p.collectionId);
    return (
      <div>
        <Header />
        <PodcastList
          podcasts={savedPodcasts}
          savedPodcastsIds={savedPodcastsIds}
          removePodcast={this.removePodcast}
          {...this.props}
        />
      </div>
    );
  }
}

Mine.propTypes = {
  savedPodcasts: PropTypes.array.isRequired,
  removeFromCollection: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { savedPodcasts } = state;
  return { savedPodcasts };
};

const mapDispatchToProps = dispatch => (
  {
    removeFromCollection: podcast => dispatch(removePodcast(podcast.collectionId)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Mine);
