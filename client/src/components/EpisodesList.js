import React from 'react';
import PropTypes from 'prop-types';
import Episode from './Episode';

const EpisodesList = ({ episodes }) => (
  (<div className="grid episode-list">
    {
      episodes.map(episode => (
        <Episode
          key={episode.link[0]}
          episode={episode}
        />
      ))
    }
  </div>)
);

EpisodesList.propTypes = {
  episodes: PropTypes.array.isRequired,
};

export default EpisodesList;
