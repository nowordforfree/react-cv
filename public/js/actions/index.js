export const ACTION_TYPES = {
  CV_ADD_FAILURE: 'CV_ADD_FAILURE',
  CV_ADD_SUCCESS: 'CV_ADD_SUCCESS',
  CV_ADD: 'CV_ADD',
  CV_DELETE_FAILURE: 'CV_DELETE_FAILURE',
  CV_DELETE_SUCCESS: 'CV_DELETE_SUCCESS',
  CV_DELETE: 'CV_DELETE',
  CV_FETCH_FAILURE: 'CV_FETCH_FAILURE',
  CV_FETCH_SUCCESS: 'CV_FETCH_SUCCESS',
  CV_FETCH: 'CV_FETCH',
  CV_SEARCH_RESET: 'CV_SEARCH_RESET',
  CV_SEARCH: 'CV_SEARCH',
  CV_SHOW: 'CV_SHOW',
  CV_UPDATE_FAILURE: 'CV_UPDATE_FAILURE',
  CV_UPDATE_SUCCESS: 'CV_UPDATE_SUCCESS',
  CV_UPDATE: 'CV_UPDATE',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT_FAILURE: 'LOGOUT_FAILURE',
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  PROFILE_UPDATE_FAILURE: 'PROFILE_UPDATE_FAILURE',
  PROFILE_UPDATE_REQUEST: 'PROFILE_UPDATE_REQUEST',
  PROFILE_UPDATE_SUCCESS: 'PROFILE_UPDATE_SUCCESS',
  SESSION_EXPIRED: 'SESSION_EXPIRED'
}

const registrationToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3Rpb24iOiJyZWdpc3RlciIsImlhdCI6MTQ4NzAwMjg2NiwiZXhwIjoxODkzNDU2MDAwfQ.RIRwNtF4n1wJnvsmZ7nkPwtAnnXuX15wTmAOY69o2Fo';

export const login = (data) => dispatch => {
  dispatch({ type: ACTION_TYPES.LOGIN_REQUEST });

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
          type: ACTION_TYPES.LOGIN_FAILURE,
          error: res.error
        });
      } else {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        dispatch({
          type: ACTION_TYPES.LOGIN_SUCCESS,
          data: res.data
        });
      }
    })
    .catch(err => {
      dispatch({
        type: ACTION_TYPES.LOGIN_FAILURE,
        error: (err.error || err.message)
      });
    });
};

export const register = (data) => dispatch => {
  dispatch({ type: ACTION_TYPES.LOGIN_REQUEST });

  return fetch(`${API_URL}/user`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${registrationToken}`
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        dispatch({
          type: ACTION_TYPES.LOGIN_FAILURE,
          error: res.error
        });
      } else {
        login(data)(dispatch);
      }
    })
    .catch(err => {
      dispatch({
        type: ACTION_TYPES.LOGIN_FAILURE,
        error: (err.error || err.message)
      });
    })
};

export const logout = () => dispatch => {
  dispatch({ type: ACTION_TYPES.LOGOUT_REQUEST });

  return fetch(`${API_URL}/auth/logout`, {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch({
        type: ACTION_TYPES.LOGOUT_SUCCESS
      });
    })
    .catch((err) => {
      dispatch({
        type: ACTION_TYPES.LOGOUT_FAILURE,
        error: (err.error || err.message)
      });
    });
};

export const updateProfile = (userId, data) => dispatch => {
  if (!userId) {
    throw new Error('userId parameter is required');
  }
  dispatch({ type: ACTION_TYPES.PROFILE_UPDATE_REQUEST });
  return fetch(`${API_URL}/user/${userId}`, {
    method: 'put',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {
    localStorage.setItem('user', JSON.stringify(res.data));
    dispatch({
      type: ACTION_TYPES.PROFILE_UPDATE_SUCCESS,
      data: res.data
    });
  })
  .catch(err => {
    dispatch({
      type: ACTION_TYPES.PROFILE_UPDATE_FAILURE,
      error: (err.error || err.message)
    })
  });
};

export const fetchCvs = (id) => dispatch => {
  dispatch({ type: ACTION_TYPES.CV_FETCH });
  let url = `${API_URL}/cv`;
  if (id) {
    url += '/' + id;
  }
  return fetch(url, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(res => res.json())
  .then(res => {
    if (res.error) {
      dispatch({
        type: ACTION_TYPES.CV_FETCH_FAILURE,
        error: res.error
      });
    } else {
      dispatch({
        type: ACTION_TYPES.CV_FETCH_SUCCESS,
        data: res.data
      });
    }
    return res;
  })
  .catch(err => {
    dispatch({
      type: ACTION_TYPES.CV_FETCH_FAILURE,
      error: (err.error || err.message)
    });
    return err;
  });
};

export const createCv = (data) => dispatch => {
  dispatch({ type: ACTION_TYPES.CV_ADD });

  return fetch(`${API_URL}/cv`, {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {
    if (res.error) {
      dispatch({
        type: ACTION_TYPES.CV_ADD_FAILURE,
        error: res.error
      });
    } else {
      dispatch({
        type: ACTION_TYPES.CV_ADD_SUCCESS,
        data: res.data
      });
    }
    return res;
  })
  .catch(err => {
    dispatch({
      type: ACTION_TYPES.CV_ADD_FAILURE,
      error: (err.error || err.message)
    });
    return err;
  });
};

export const updateCv = (cvId, data) => dispatch => {
  if (!cvId) {
    throw new Error('id parameter is required');
  }
  dispatch({ type: ACTION_TYPES.CV_UPDATE });
  return fetch(`${API_URL}/cv/${cvId}`, {
    method: 'put',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {
    if (res.error) {
      dispatch({
        type: ACTION_TYPES.CV_UPDATE_FAILURE,
        error: res.error
      });
    } else {
      dispatch({
        type: ACTION_TYPES.CV_UPDATE_SUCCESS,
        data: res.data
      });
    }
    return res;
  })
  .catch(err => {
    dispatch({
      type: ACTION_TYPES.CV_UPDATE_FAILURE,
      error: (err.error || err.message)
    });
    return err;
  });
};

export const deleteCvs = (ids) => dispatch => {
  if (!ids || !ids.length) {
    throw new Error('id(s) parameter is required');
  }
  dispatch({ type: ACTION_TYPES.CV_DELETE });
  let url = `${API_URL}/cv`;
  let options = {
    method: 'delete',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  };
  if (ids instanceof Array) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(ids);
  } else {
    url += `/${ids}`;
  }
  return fetch(url, options)
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: ACTION_TYPES.CV_DELETE_SUCCESS,
        data: ids
      });
      return res;
    })
    .catch(err => {
      dispatch({
        type: ACTION_TYPES.CV_DELETE_FAILURE,
        error: (err.error || err.message)
      });
      return err;
    });
};

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
      type: ACTION_TYPES.CV_SEARCH,
      filter: resFilter
    });
  } else {
    dispatch({ type: ACTION_TYPES.CV_SEARCH_RESET });
  }
};
