import SessionHandler from '../plugins/sessionHandler';

export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';
export const GET_USER = 'GET_USER';
export const GET_USER_ERROR = 'GET_USER_ERROR';

const API_URL = 'http://localhost:3000/api';

export function getUser() {
  return function (dispatch) {
    fetch(`${API_URL}/user`, {
      method: 'GET',
      headers: {
        'Authorization': SessionHandler.getJwt(), //eslint-disable-line
        'Accept': 'application/json', //eslint-disable-line
        'Content-Type': 'application/json' //eslint-disable-line
      },
    })
    .then(res => res.json())
    .then((res) => {
      if (res.error) {
        dispatch({ type: GET_USER_ERROR, payload: res.error });
      } else {
        dispatch({ type: GET_USER, payload: res.user });
      }
    });
  };
}

export function updateUser(updateHash) {
  return function (dispatch) {
    fetch(`${API_URL}/user`, {
      method: 'PUT',
      headers: {
        'Authorization': SessionHandler.getJwt(), //eslint-disable-line
        'Accept': 'application/json', //eslint-disable-line
        'Content-Type': 'application/json' //eslint-disable-line
      },
      body: JSON.stringify({ data: updateHash }),
    })
    .then(res => res.json())
    .then((res) => {
      if (res.error) {
        dispatch({ type: UPDATE_USER_ERROR, payload: res.error });
      } else {
        dispatch({ type: UPDATE_USER, payload: res.user });
      }
    });
  };
}

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
        dispatch({ type: AUTH_USER, payload: res.user });
        SessionHandler.saveJwt(res.token);
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
        dispatch({ type: AUTH_USER, payload: res.user });
        SessionHandler.saveJwt(res.token);
      }
    });
  };
}

export function logoutUser() {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    SessionHandler.removeJwt();
  };
}
