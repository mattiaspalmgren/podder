import PodderApi from '../plugins/podderApi';

export const RECEIVE_EPISODES = 'RECEIVE_EPISODES';
export const REQUEST_EPISODES = 'REQUEST_EPISODES';

export function requestEpisodes() {
  return {
    type: REQUEST_EPISODES,
  };
}

export function receiveEpisodes(episodes) {
  return {
    type: RECEIVE_EPISODES,
    episodes,
  };
}

export function getFeed(feedUrls) {
  return (dispatch) => {
    dispatch(requestEpisodes());
    return PodderApi.getFeed(feedUrls)
      .then((res) => {
        dispatch(receiveEpisodes(res.episodes));
      });
  };
}

