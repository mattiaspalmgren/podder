import { ADD_PODCAST, REMOVE_PODCAST } from '../actions';
import archive from './tmpArchive';

const savedPodcasts = (state = archive, action) => {
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
