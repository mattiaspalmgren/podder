import { REQUEST_EPISODES, RECEIVE_EPISODES } from '../actions/episodesActions';

export default function episodes(state = {
  isFetching: false,
  episodes: [],
}, action) {
  switch (action.type) {
    case RECEIVE_EPISODES:
      return { episodes: action.episodes, isFetching: false };
    case REQUEST_EPISODES:
      return { ...state, isFetching: true };
    default:
      return state;
  }
}
