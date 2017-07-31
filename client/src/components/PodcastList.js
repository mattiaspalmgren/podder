import React from 'react';
import PropTypes from 'prop-types';
import Podcast from './Podcast';

const PodcastList = ({ savedPodcastsIds = [], podcasts, onClick }) => (
  (<div className="grid gallery">
    { podcasts &&
      podcasts.map((podcast) => {
        const isSaved = savedPodcastsIds &&
          savedPodcastsIds.some(id => id === podcast.collectionId);
        return (
          <Podcast
            key={podcast.collectionId}
            {...podcast}
            podcast={podcast}
            onClick={() => onClick(podcast)}
            saved={isSaved}
          />
        );
      })
    }
  </div>)
);

PodcastList.propTypes = {
  podcasts: PropTypes.arrayOf(
    PropTypes.shape({
      collectionId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  onClick: PropTypes.func.isRequired,
  savedPodcastsIds: PropTypes.array,
};

PodcastList.defaultProps = {
  savedPodcastsIds: [],
};

export default PodcastList;
