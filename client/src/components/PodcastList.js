import React from 'react';
import PropTypes from 'prop-types';
import Podcast from './Podcast';

const PodcastList = ({ location: { pathname }, podcasts, onClick }) => (
  <div className="grid gallery">
    { podcasts &&
      podcasts.map(podcast =>
        (
          <Podcast
            key={podcast.collectionId}
            {...podcast}
            podcast={podcast}
            onClick={() => onClick(podcast)}
            location={pathname}
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
  location: PropTypes.object.isRequired,
};

export default PodcastList;
