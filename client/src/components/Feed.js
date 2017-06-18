import React from 'react';
import PodcastList from './PodcastList';

const Feed = (props) => {
  const { podcasts } = props;
  
  return (
    <div className="grid">
      <PodcastList podcasts={podcasts}/>
    </div>
  );
};

export default Feed;