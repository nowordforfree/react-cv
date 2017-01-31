export const CV_ADD = 'CV_ADD'
export const CV_SHOW = 'CV_SHOW'
export const CV_SEARCH = 'CV_SEARCH'
export const CV_SEARCH_RESET = 'CV_SEARCH_RESET'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
export const PROFILE_UPDATE_REQUEST = 'PROFILE_UPDATE_REQUEST'
export const PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS'
export const PROFILE_UPDATE_FAILURE = 'PROFILE_UPDATE_FAILURE'
export const CV_FETCH = 'CV_FETCH'
export const CV_RECEIVED = 'CV_RECEIVED'
export const CV_FAILURE = 'CV_FAILURE'

export const login = (data) => dispatch => {
  dispatch({ type: LOGIN_REQUEST });

  return fetch(`${API_URL}/auth/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        dispatch({
          type: LOGIN_FAILURE,
          error: res.error
        });
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
          data: res.data
        });
      }
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAILURE,
        error: (err.error || err.message)
      });
    });
};

export const register = (data) => dispatch => {
  dispatch({ type: LOGIN_REQUEST });

  return fetch(`${API_URL}/user`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        dispatch({
          type: LOGIN_FAILURE,
          error: res.error
        });
      } else {
        login(data)(dispatch);
      }
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAILURE,
        error: (err.error || err.message)
      });
    })
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_REQUEST });

  return fetch(`${API_URL}/auth/logout`, {
      method: 'post'
    })
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGOUT_FAILURE,
        error: (err.error || err.message)
      });
    });
};

export const updateProfile = (userId, data) => dispatch => {
  dispatch({ type: PROFILE_UPDATE_REQUEST });

  return fetch(`${API_URL}/user/${userId}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {
    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      data: res.data
    });
  })
  .catch(err => {
    dispatch({
      type: PROFILE_UPDATE_FAILURE,
      error: (err.error || err.message)
    })
  });
};

export const fetchCvs = (id) => dispatch => {
  dispatch({ type: CV_FETCH });
  let url = `${API_URL}/cv`;
  if (id) {
    url += '/' + id;
  }
  return fetch(url)
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: CV_RECEIVED,
        data: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: CV_FAILURE,
        error: (err.error || err.message)
      });
    });
};

let nextId = 0;

export const addCv = (data) => ({
  type: CV_ADD,
  id: nextId++,
  data
});

export const setVisibilityFilter = (filter) => dispatch => {
  if (filter.length ||
     (filter.text && filter.text.length)) {
    let resFilter = {};
    if (typeof filter === 'string') {
      resFilter = {
        type: 'FUZZY',
        text: filter
      };
    } else if (typeof filter === 'object') {
      resFilter = filter;
    } else {
      throw new Error('Unknown filter type');
    }
    dispatch({
      type: CV_SEARCH,
      filter: resFilter
    });
  } else {
    dispatch({ type: CV_SEARCH_RESET });
  }
};
