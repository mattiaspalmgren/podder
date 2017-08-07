import { combineReducers } from 'redux';
import savedPodcasts from './savedPodcasts';
import explorePodcasts from './explorePodcasts';
import episodes from './episodes';

const podder = combineReducers({
  savedPodcasts,
  explorePodcasts,
  episodes,
});

export default podder;
