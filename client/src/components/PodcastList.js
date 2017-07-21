import React from 'react';
import PropTypes from 'prop-types';
import Podcast from './Podcast';

const PodcastList = ({ podcasts, onPodcastClick }) => (
  <div className="grid gallery">
    { podcasts &&
      podcasts.map(podcast =>
        (
          <Podcast
            key={podcast.collectionId}
            {...podcast}
            podcast={podcast}
            onClick={() => onPodcastClick(podcast.collectionId)}
          />
        ))
    }
  </div>
);

PodcastList.propTypes = {
  podcasts: PropTypes.arrayOf(
    PropTypes.shape({
      collectionId: PropTypes.number.isRequired,
      saved: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  onPodcastClick: PropTypes.func.isRequired,
};

export default PodcastList;
