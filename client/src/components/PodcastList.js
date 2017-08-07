import React from 'react';
import PropTypes from 'prop-types';
import Podcast from './Podcast';

const PodcastList = ({
  location: { pathname },
  savedPodcastsIds = [],
  podcasts,
  savePodcast,
  removePodcast,
}) => (
  (<div className="grid podcast-list">
    { podcasts &&
      podcasts.map((podcast) => {
        const isSaved = savedPodcastsIds &&
          savedPodcastsIds.some(id => id === podcast.collectionId);
        const onClick = isSaved ? removePodcast : savePodcast;
        return (
          <Podcast
            key={podcast.collectionId}
            {...podcast}
            podcast={podcast}
            onClick={() => onClick(podcast)}
            saved={isSaved}
            location={pathname}
          />
        );
      })
    }
  </div>)
);

PodcastList.propTypes = {
  podcasts: PropTypes.array.isRequired,
  savePodcast: PropTypes.func.isRequired,
  removePodcast: PropTypes.func.isRequired,
  savedPodcastsIds: PropTypes.array,
  location: PropTypes.object.isRequired,
};

PodcastList.defaultProps = {
  savedPodcastsIds: [],
};

export default PodcastList;
