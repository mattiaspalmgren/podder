import React from 'react';
import PropTypes from 'prop-types';
import Podcast from './Podcast';

const PodcastList = ({
  location: { pathname },
  savedPodcastsIds = [],
  podcasts,
  togglePodcastOnUser,
}) => (
  (<div className="grid podcast-list">
    { podcasts &&
      podcasts.map((podcast) => {
        const isSaved = savedPodcastsIds &&
          savedPodcastsIds.some(id => id === podcast.collectionId);
        return (
          <Podcast
            key={podcast.collectionId}
            {...podcast}
            podcast={podcast}
            onClick={() => togglePodcastOnUser(podcast)}
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
  togglePodcastOnUser: PropTypes.func.isRequired,
  savedPodcastsIds: PropTypes.array,
  location: PropTypes.object.isRequired,
};

PodcastList.defaultProps = {
  savedPodcastsIds: [],
};

export default PodcastList;
