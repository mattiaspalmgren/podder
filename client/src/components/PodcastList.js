import React from 'react';
import Podcast from './Podcast';

const PodcastList = (props) => {
  const { podcasts } = props;

  return (
    <div className="grid gallery">
      {
        podcasts.map((podcast) => {
          return (
            <Podcast key={podcast.collectionId} podcast={podcast} />
          )
        })
      }
    </div>
  );
};

export default PodcastList;