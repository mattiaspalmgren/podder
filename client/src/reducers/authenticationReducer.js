import { AUTH_USER, AUTH_ERROR } from '../actions/authenticationActions';

const INITIAL_STATE = { error: '', message: '', content: '', authenticated: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', message: '', authenticated: true };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
