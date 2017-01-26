export const CV_ADD = 'CV_ADD'
export const CV_SHOW = 'CV_SHOW'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
export const CV_FETCH = 'CV_FETCH'
export const CV_RECEIVED = 'CV_RECEIVED'
export const CV_FAILURE = 'CV_FAILURE'

export const login = (params) =>  dispatch => {
  dispatch({ type: LOGIN_REQUEST });

  return fetch(`${API_URL}/auth/login`, params)
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        return dispatch({
          type: LOGIN_FAILURE,
          error: res.error
        });
      }
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      dispatch({
        type: LOGIN_SUCCESS,
        data: res.data.user
      });
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAILURE,
        error: (err.message || err)
      });
    });
};

export const register = (params) => dispatch => {
  dispatch({ type: LOGIN_REQUEST });

  return fetch(`${API_URL}/user`, params)
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        let err = '';
        if (res.error.errors) {
          res.error.errors.map(obj => {
            err += obj.message + ' ';
          });
        } else {
          err = res.error;
        }
        dispatch({
          type: LOGIN_FAILURE,
          error: err
        });
      } else {
        login(params)(dispatch);
      }
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAILURE,
        error: (err.message || err)
      });
    })
};

export const logout = () =>  dispatch => {
  dispatch({ type: LOGOUT_REQUEST });

  return fetch(`${API_URL}/auth/logout`, {
      method: 'post'
    })
    .then((res) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGOUT_FAILURE,
        error: err.error
      });
    });
};

export const fetchCvs = () => dispatch => {
  dispatch({ type: CV_FETCH });

  return fetch(`${API_URL}/cv`)
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
        error: (err.message || err)
      });
    });
};

let nextId = 0;

export const addCv = (data) => ({
  type: CV_ADD,
  id: nextId++,
  data
});

export const setVisibilityFilter = (filter) => ({
  type: SET_VISIBILITY_FILTER,
  filter
});

export const showCv = (id) => ({
  type: CV_SHOW,
  id
});
