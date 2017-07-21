export const setVisibilityFilter = filter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const togglePod = id => {
  return {
    type: 'TOGGLE_POD',
    id
  }
}