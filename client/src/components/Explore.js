import React from 'react';
import SearchBar from './SearchBar';
import PodcastList from './PodcastList';

const Explore = (props) => {
  const { handleSearch, podcasts } = props;
  return (
    <div className="grid">
      <PodcastList podcasts={podcasts}/>
    </div>
  );
};

export default Explore;
