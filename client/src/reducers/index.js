import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import savedPodcasts from './savedPodcastsReducer';
import explorePodcasts from './explorePodcastsReducer';
import episodes from './episodesReducer';
import user from './userReducer';

const podder = combineReducers({
  savedPodcasts,
  explorePodcasts,
  episodes,
  user,
  form,
});

const rootReducer = (state, action) => {
  if (action.type === 'UNAUTH_USER') {
    // Reset all reducers
    state = undefined; //eslint-disable-line
  }
  return podder(state, action);
};
export default rootReducer;
