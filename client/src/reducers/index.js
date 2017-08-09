import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import savedPodcasts from './savedPodcastsReducer';
import explorePodcasts from './explorePodcastsReducer';
import episodes from './episodesReducer';
import auth from './authenticationReducer';

const podder = combineReducers({
  savedPodcasts,
  explorePodcasts,
  episodes,
  auth,
  form: formReducer,
});

export default podder;
