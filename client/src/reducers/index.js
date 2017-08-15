import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import savedPodcasts from './savedPodcastsReducer';
import explorePodcasts from './explorePodcastsReducer';
import episodes from './episodesReducer';
import user from './userReducer';

const podder = combineReducers({
  savedPodcasts,
  explorePodcasts,
  episodes,
  user,
  form: formReducer,
});

export default podder;
