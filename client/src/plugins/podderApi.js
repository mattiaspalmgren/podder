import SessionHandler from '../plugins/sessionHandler';

const API_URL = 'http://localhost:3000/api';
const USER_URL = `${API_URL}/user`;
const REGISTER_URL = `${API_URL}/register`;
const LOGIN_URL = `${API_URL}/login`;

/* eslint-disable */

const AUTH_HEADER = new Headers({
  'Authorization': SessionHandler.getJwt(),
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}); 

const NON_AUTH_HEADER = new Headers({
  'Accept': 'application/json', 
  'Content-Type': 'application/json' 
});

/* eslint-enable */

const PodderApi = {
  getUser: () => (
    fetch(USER_URL, {
      method: 'GET',
      headers: AUTH_HEADER,
    })
  ),
  updateUser: updateHash => (
    fetch(USER_URL, {
      method: 'PUT',
      headers: AUTH_HEADER,
      body: JSON.stringify({ data: updateHash }),
    })
  ),
  register: (email, password) => (
    fetch(REGISTER_URL, {
      method: 'POST',
      headers: NON_AUTH_HEADER,
      body: JSON.stringify({ email, password }),
    })
  ),
  login: (email, password) => (
    fetch(LOGIN_URL, {
      method: 'POST',
      headers: NON_AUTH_HEADER,
      body: JSON.stringify({ email, password }),
    })
  ),
};

export default PodderApi;
