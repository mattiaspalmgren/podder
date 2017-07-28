import React from 'react';
import PropTypes from 'prop-types';
import Podcast from './Podcast';

const PodcastList = ({ podcasts, onClick }) => (
  <div className="grid gallery">
    { podcasts &&
      podcasts.map(podcast =>
        (
          <Podcast
            key={podcast.collectionId}
            {...podcast}
            podcast={podcast}
            onClick={() => onClick(podcast)}
          />
        ))
    }
  </div>
);

PodcastList.propTypes = {
  podcasts: PropTypes.arrayOf(
    PropTypes.shape({
      collectionId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PodcastList;
