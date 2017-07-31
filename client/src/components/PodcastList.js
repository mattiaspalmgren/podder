import React from 'react';
import PropTypes from 'prop-types';
import Podcast from './Podcast';

const PodcastList = ({
  location: { pathname },
  savedPodcastsIds = [],
  podcasts,
  addToCollection,
  removeFromCollection,
}) => (
  (<div className="grid gallery">
    { podcasts &&
      podcasts.map((podcast) => {
        const isSaved = savedPodcastsIds &&
          savedPodcastsIds.some(id => id === podcast.collectionId);
        const onClick = isSaved ? removeFromCollection : addToCollection;
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
  addToCollection: PropTypes.func.isRequired,
  removeFromCollection: PropTypes.func.isRequired,
  savedPodcastsIds: PropTypes.array,
  location: PropTypes.object.isRequired,
};

PodcastList.defaultProps = {
  savedPodcastsIds: [],
};

export default PodcastList;
