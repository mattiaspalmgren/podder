import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EpisodesList from '../components/EpisodesList';
import Header from '../components/Header';

const Feed = ({ episodes }) => (
  <div>
    <Header />
    <EpisodesList episodes={episodes} />
  </div>
);

Feed.propTypes = {
  episodes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const { episodes: { episodes } } = state;
  return { episodes };
};

export default connect(mapStateToProps)(Feed);
