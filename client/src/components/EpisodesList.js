import React from 'react';
import PropTypes from 'prop-types';
import Episode from './Episode';

const EpisodesList = ({ episodes }) => {
  const getKey = episode => (episode.link ? episode.link[0] : episode.description);
  return (<div className="grid episode-list">
    {
      episodes.map(episode => (
        <Episode
          key={getKey(episode)}
          episode={episode}
        />
      ))
    }
  </div>);
};

EpisodesList.propTypes = {
  episodes: PropTypes.array.isRequired,
};

export default EpisodesList;
