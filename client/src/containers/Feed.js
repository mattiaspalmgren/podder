import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EpisodesList from '../components/EpisodesList';

const Feed = ({ episodes }) => (
  <EpisodesList episodes={episodes} />
);

Feed.propTypes = {
  episodes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const { episodes: { episodes } } = state;
  return { episodes };
};

export default connect(mapStateToProps)(Feed);
