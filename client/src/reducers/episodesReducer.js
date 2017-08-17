import { UPDATE_EPISODES, REQUEST_EPISODES, RECEIVE_EPISODES } from '../actions/episodesActions';

function sortByDate(collection) {
  return collection.sort(e => Date.parse(e.pubDate[0]));
}

function xor(collections, collection) {
  const updateCollectionId = collection[0].collectionId;
  const included = collections.map(p => p.collectionId).includes(updateCollectionId);
  return included ?
    collections.filter(p => p.collectionId !== updateCollectionId) :
    sortByDate(collections.concat(collection));
}

export default function episodes(state = {
  isFetching: false,
  episodes: [],
}, action) {
  switch (action.type) {
    case RECEIVE_EPISODES:
      return { episodes: action.episodes, isFetching: false };
    case UPDATE_EPISODES:
      return { episodes: xor(state.episodes, action.episodes), isFetching: false };
    case REQUEST_EPISODES:
      return { ...state, isFetching: true };
    default:
      return state;
  }
}
