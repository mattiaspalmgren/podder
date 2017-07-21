export const setVisibilityFilter = filter => (
  {
    type: 'SET_VISIBILITY_FILTER',
    filter,
  });

export const togglePod = id => (
  {
    type: 'TOGGLE_POD',
    id,
  });
