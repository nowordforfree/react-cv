const cv = (state, action) => {
  switch (action.type) {
    case 'CV_ADD':
      return {
        id: action.id,
        data: action
      };
    default:
      return state;
  }
};

const cvs = (state = [], action) => {
  switch (action.type) {
    case 'CV_ADD':
      return [
        ...state,
        cv(undefined, action)
      ];
    default:
      return state;
  }
}

export default cvs;
