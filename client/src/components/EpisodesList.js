import React from 'react';
import PropTypes from 'prop-types';
import Episode from './Episode';

const EpisodesList = ({ episodes }) => (
  (<div className="grid gallery episode-list">
    {
      episodes.map(episode => (
        <Episode
          key={episode['itunes:summary']}
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
