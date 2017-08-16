import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUser } from '../actions/userActions';
import PodcastList from '../components/PodcastList';

const Mine = ({
  location: { pathname },
  savedPodcasts,
  togglePodcastOnUser,
}) => {
  const savedPodcastsIds = savedPodcasts.map(p => p.collectionId);
  return (
    <PodcastList
      podcasts={savedPodcasts}
      savedPodcastsIds={savedPodcastsIds}
      togglePodcastOnUser={togglePodcastOnUser}
      location={{ pathname }}
    />
  );
};

Mine.propTypes = {
  savedPodcasts: PropTypes.array.isRequired,
  togglePodcastOnUser: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { savedPodcasts } = state;
  return { savedPodcasts };
};

const mapDispatchToProps = dispatch => (
  {
    togglePodcastOnUser: podcast => dispatch(updateUser(podcast)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Mine);
