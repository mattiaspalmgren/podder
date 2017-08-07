import fetch from 'isomorphic-fetch';
import { parseString } from 'xml2js';

export const SEARCH_TERM = 'SEARCH_TERM';
export const REQUEST_PODCASTS = 'REQUEST_PODCASTS';
export const RECEIVE_PODCASTS = 'RECEIVE_PODCASTS';
export const REQUEST_EPISODES = 'REQUEST_EPISODES';
export const RECEIVE_EPISODES = 'RECEIVE_EPISODES';
export const ADD_PODCAST = 'ADD_PODCAST';
export const REMOVE_PODCAST = 'REMOVE_PODCAST';

export const addPodcast = podcast => (
  {
    type: ADD_PODCAST,
    podcast,
  });

export const removePodcast = podcastId => (
  {
    type: REMOVE_PODCAST,
    podcastId,
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

export function requestEpisodes(feedUrl) {
  return {
    type: REQUEST_EPISODES,
    feedUrl,
  };
}

export function receiveEpisodes(feedUrl, episodes) {
  return {
    type: RECEIVE_EPISODES,
    feedUrl,
    episodes,
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


export function fetchEpisodes(feedUrl) {
  return (dispatch) => {
    dispatch(requestEpisodes(feedUrl));
    return fetch(feedUrl)
      .then(response => response.text())
      .then((xmlString) => {
        parseString(xmlString, (err, result) => {
          const episodesObjects = result.rss.channel[0].item.slice(1, 10);
          dispatch(receiveEpisodes(feedUrl, episodesObjects));
        });
      });
  };
}

export function initialize(searchTerm, feedUrl) {
  return (dispatch) => {
    dispatch(fetchPodcasts(searchTerm));
    dispatch(fetchEpisodes(feedUrl));
  };
}
