import {
  REQUEST_EPISODES,
  RECEIVE_EPISODES,
} from '../actions';

export default function episodes(state = {
  isFetching: false,
  episodes: [],
}, action) {
  switch (action.type) {
    case REQUEST_EPISODES:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_EPISODES:
      return Object.assign({}, state, {
        isFetching: false,
        episodes: action.episodes,
      });
    default:
      return state;
  }
}
