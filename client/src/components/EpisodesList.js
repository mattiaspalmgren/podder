import React from 'react';
import PropTypes from 'prop-types';
import Episode from './Episode';

const EpisodesList = ({ episodes, metaPodcasts }) => {
  const getKey = episode => (episode.link ? episode.link[0] : episode.description);

  const getAltImg = episode =>
    metaPodcasts.find(mp => mp.collectionId === episode.collectionId).artworkUrl600;

  const getAltAuthor = episode =>
    metaPodcasts.find(mp => mp.collectionId === episode.collectionId).collectionName;

  return (<div className="grid episode-list">
    {
      episodes.map(episode => (
        <Episode
          key={getKey(episode)}
          episode={episode}
          altMeta={{
            artworkUrl600: getAltImg(episode),
            collectionName: getAltAuthor(episode),
          }}
        />
      ))
    }
  </div>);
};

EpisodesList.propTypes = {
  episodes: PropTypes.array.isRequired,
  metaPodcasts: PropTypes.array.isRequired,
};

export default EpisodesList;
