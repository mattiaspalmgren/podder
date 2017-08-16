import fetch from 'isomorphic-fetch';
import PodderApi from '../plugins/podderApi';

export const UPDATE_PODCASTS = 'UPDATE_PODCASTS';
export const GET_PODCASTS = 'GET_PODCASTS';
export const SEARCH_TERM = 'SEARCH_TERM';
export const REQUEST_PODCASTS = 'REQUEST_PODCASTS';
export const RECEIVE_PODCASTS = 'RECEIVE_PODCASTS';

export function getUserPodcasts() {
  return function (dispatch) {
    PodderApi.getPodcasts()
      .then((res) => {
        dispatch({ type: GET_PODCASTS, payload: res.podcasts });
      });
  };
}

export function updatePodcasts(podcast) {
  return {
    type: UPDATE_PODCASTS,
    podcast,
  };
}

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
