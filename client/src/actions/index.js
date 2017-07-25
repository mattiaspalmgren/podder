import fetch from 'isomorphic-fetch';

export const SEARCH_TERM = 'SEARCH_TERM';
export const REQUEST_PODCASTS = 'REQUEST_PODCASTS';
export const RECEIVE_PODCASTS = 'RECEIVE_PODCASTS';

export const togglePod = id => (
  {
    type: 'TOGGLE_POD',
    id,
  });

export function requestPodcasts(searchTerm) {
  return {
    type: REQUEST_PODCASTS,
    searchTerm,
  };
}

export function receivePodcasts(searchTerm, json) {
  return {
    type: RECEIVE_PODCASTS,
    searchTerm,
    podcasts: json.results,
    receivedAt: Date.now(),
  };
}

export function fetchPodcasts(searchTerm) {
  return (dispatch) => {
    dispatch(requestPodcasts(searchTerm));
    return fetch(`https://itunes.apple.com/search?media=podcast&limit=30&entity=podcast&term='${searchTerm}'`)
      .then(response => response.json())
      .then(json => dispatch(receivePodcasts(searchTerm, json)));
  };
}
