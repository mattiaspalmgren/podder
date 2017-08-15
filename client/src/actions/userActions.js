import history from '../plugins/history';

export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

const API_URL = 'http://localhost:3000/api';

function login(token) {
  sessionStorage.setItem('jwt', token);
  history.push('/feed');
}

function logout() {
  sessionStorage.removeItem('jwt');
}

function getJwt() {
  return sessionStorage.getItem('jwt').replace('JWT ', '');
}

export function getUser() {
  return function (dispatch) {
    fetch(`${API_URL}/user`, {
      method: 'GET',
      headers: {
        'Authorization': getJwt(), //eslint-disable-line
        'Accept': 'application/json', //eslint-disable-line
        'Content-Type': 'application/json' //eslint-disable-line
      },
    })
    .then(res => res.json())
    .then((res) => {
      if (res.error) {
        // dispatch({ type: UPDATE_USER_ERROR, payload: res.error });
        console.log(res.error);
      } else {
        console.log(res);
        // dispatch({ type: UPDATE_USER, payload: res });
      }
    });
  };
}

export function updateUser(podcastId) {
  return function (dispatch) {
    fetch(`${API_URL}/user`, {
      method: 'PUT',
      headers: {
        'Authorization': getJwt(), //eslint-disable-line
        'Accept': 'application/json', //eslint-disable-line
        'Content-Type': 'application/json' //eslint-disable-line
      },
      body: JSON.stringify({ collectionId: podcastId }),
    })
    .then(res => res.json())
    .then((res) => {
      if (res.error) {
        dispatch({ type: UPDATE_USER_ERROR, payload: res.error });
      } else {
        dispatch({ type: UPDATE_USER, payload: res });
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
        dispatch({ type: AUTH_USER, payload: res });
        login(res.token);
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
        dispatch({ type: AUTH_USER, payload: res });
        login(res.token);
      }
    });
  };
}

export function logoutUser() {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    logout();
  };
}
