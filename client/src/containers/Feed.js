import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EpisodesList from '../components/EpisodesList';

const Feed = ({ episodes, isFetching }) => (
  <div>
    { isFetching &&
      <div className="episode">
        <i className="spinner" />
      </div>
    }
    <EpisodesList episodes={episodes} />
  </div>
);

Feed.propTypes = {
  episodes: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { episodes: { episodes, isFetching } } = state;
  return { episodes, isFetching };
};

export default connect(mapStateToProps)(Feed);
