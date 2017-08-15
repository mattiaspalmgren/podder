import { UNAUTH_USER, AUTH_USER, AUTH_ERROR } from '../actions/authenticationActions';

const INITIAL_AUTH = !!sessionStorage.jwt;
const INITIAL_STATE = { error: '', authenticated: INITIAL_AUTH };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', user: action.payload.user, authenticated: true };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    default:
      return state;
  }
}
