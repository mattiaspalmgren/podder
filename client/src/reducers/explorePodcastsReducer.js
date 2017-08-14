import { REQUEST_PODCASTS, RECEIVE_PODCASTS } from '../actions/podcastActions';

export default function explorePodcasts(state = {
  isFetching: false,
  foundPodcasts: [],
}, action) {
  switch (action.type) {
    case REQUEST_PODCASTS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_PODCASTS:
      return Object.assign({}, state, {
        isFetching: false,
        foundPodcasts: action.podcasts,
      });
    default:
      return state;
  }
}
