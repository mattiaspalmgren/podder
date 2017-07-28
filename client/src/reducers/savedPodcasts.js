import {
  ADD_PODCAST,
  REMOVE_PODCAST,
} from '../actions';

const savedPodcasts = (state = [], action) => {
  switch (action.type) {
    case ADD_PODCAST:
      return [...state, action.podcast];
    case REMOVE_PODCAST:
      return state.filter(pod => pod.collectionId !== action.podcastId);
    default:
      return state;
  }
};

export default savedPodcasts;
