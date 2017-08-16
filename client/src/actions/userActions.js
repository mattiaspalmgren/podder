import SessionHandler from '../plugins/sessionHandler';
import PodderApi from '../plugins/podderApi';
import { updatePodcasts, getUserPodcasts } from './podcastActions';

export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';
export const GET_USER = 'GET_USER';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export function getUser() {
  return function (dispatch) {
    PodderApi.getUser()
      .then((res) => {
        if (res.error) {
          dispatch({ type: GET_USER_ERROR, payload: res.error });
        } else {
          dispatch({ type: GET_USER, payload: res.user });
          dispatch(getUserPodcasts());
        }
      });
  };
}

export function updateUser(podcast) {
  const updateHash = { subscribedIds: podcast.collectionId };
  return function (dispatch) {
    PodderApi.updateUser(updateHash)
      .then((res) => {
        if (res.error) {
          dispatch({ type: UPDATE_USER_ERROR, payload: res.error });
        } else {
          dispatch({ type: UPDATE_USER, payload: res.user });
          dispatch(updatePodcasts(podcast));
        }
      });
  };
}

export function registerUser({ email, password }) {
  return function (dispatch) {
    PodderApi.register(email, password)
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
    PodderApi.login(email, password)
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
