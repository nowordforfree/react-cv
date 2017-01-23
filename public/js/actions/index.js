let nextId = 0;

export const addCv = (data) => ({
  type: 'CV_ADD',
  id: nextId++,
  data
});

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

export const showCv = (id) => ({
  type: 'CV_SHOW',
  id
});
