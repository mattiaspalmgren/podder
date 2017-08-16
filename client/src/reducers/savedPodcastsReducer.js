import { GET_PODCASTS, UPDATE_PODCASTS } from '../actions/podcastActions';

function xor(podcasts, podcast) {
  const included = podcasts.map(p => p.collectionId).includes(podcast.collectionId);
  return included ?
    podcasts.filter(p => p.collectionId !== podcast.collectionId) :
    podcasts.concat([podcast]);
}

const savedPodcasts = (state = [], action) => {
  switch (action.type) {
    case UPDATE_PODCASTS:
      return xor(state, action.podcast);
    case GET_PODCASTS:
      return action.payload;
    default:
      return state;
  }
};

export default savedPodcasts;
