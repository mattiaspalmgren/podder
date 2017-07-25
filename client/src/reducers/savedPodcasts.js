import podcastsSrc from '../podcastsSrc';

const savedPodcasts = (state = podcastsSrc, action) => {
  switch (action.type) {
    case 'TOGGLE_POD':
      return state.map(podcast =>
        (
          (podcast.collectionId === action.id)
          ? { ...podcast, saved: !podcast.saved } : podcast
        ));
    default:
      return state;
  }
};

export default savedPodcasts;
