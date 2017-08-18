import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EpisodesList from '../components/EpisodesList';

const Feed = ({ episodes, isFetching, metaPodcasts }) => (
  <div>
    { isFetching &&
      <div className="spinner__container">
        <i className="spinner" />
      </div>
    }
    <EpisodesList episodes={episodes} metaPodcasts={metaPodcasts} isFetching={isFetching} />
  </div>
);

Feed.propTypes = {
  episodes: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  metaPodcasts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const { episodes: { episodes, isFetching }, savedPodcasts } = state;
  const pickMetas = ({ collectionId, collectionName, artworkUrl600 }) =>
   ({ collectionId, collectionName, artworkUrl600 });
  const metaPodcasts = savedPodcasts.map(pickMetas);
  return { episodes, isFetching, metaPodcasts };
};

export default connect(mapStateToProps)(Feed);
