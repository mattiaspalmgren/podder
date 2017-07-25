import { combineReducers } from 'redux';
import savedPodcasts from './savedPodcasts';
import explorePodcasts from './explorePodcasts';

const podder = combineReducers({
  savedPodcasts,
  explorePodcasts,
});

export default podder;
