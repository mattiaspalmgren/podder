import fetch from 'isomorphic-fetch';
import { parseString } from 'xml2js';

export const REQUEST_EPISODES = 'REQUEST_EPISODES';
export const RECEIVE_EPISODES = 'RECEIVE_EPISODES';

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
