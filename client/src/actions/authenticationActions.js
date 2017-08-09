export const AUTH_USER = 'auth_user';
export const AUTH_ERROR = 'auth_error';

const API_URL = 'http://localhost:3000/api';

export function registerUser({ email, password }) {
  return function (dispatch) {
    fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json', //eslint-disable-line
        'Content-Type': 'application/json' //eslint-disable-line
      },
      body: JSON.stringify({ email, password }),
    })
    .then(res => res.json())
    .then((res) => {
      if (res.error) {
        dispatch({ type: AUTH_ERROR, payload: res.error });
      } else {
        dispatch({ type: AUTH_USER });
      }
    });
  };
}

export function loginUser({ email, password }) {
  return function (dispatch) {
    fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json', //eslint-disable-line
        'Content-Type': 'application/json' //eslint-disable-line
      },
      body: JSON.stringify({ email, password }),
    })
    .then(res => res.json())
    .then((res) => {
      if (res.error) {
        dispatch({ type: AUTH_ERROR, payload: res.error });
      } else {
        dispatch({ type: AUTH_USER });
      }
    });
  };
}
