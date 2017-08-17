import PodderApi from '../plugins/podderApi';

export const RECEIVE_EPISODES = 'RECEIVE_EPISODES';
export const REQUEST_EPISODES = 'REQUEST_EPISODES';
export const UPDATE_EPISODES = 'UPDATE_EPISODES';

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

export function updateEpisodes(episodes) {
  return {
    type: UPDATE_EPISODES,
    episodes,
  };
}

export function getFeed(metaEpisodes) {
  return (dispatch) => {
    dispatch(requestEpisodes());
    return PodderApi.getFeed(metaEpisodes)
      .then((res) => {
        dispatch(receiveEpisodes(res.episodes));
      });
  };
}

export function getEpisodes(podcast) {
  const metaEpisode = { feedUrl: podcast.feedUrl, collectionId: podcast.collectionId };
  return (dispatch) => {
    dispatch(requestEpisodes());
    return PodderApi.getEpisodes(metaEpisode)
      .then((res) => {
        dispatch(updateEpisodes(res.episodes));
      });
  };
}

