import SessionHandler from '../plugins/sessionHandler';

const API_URL = 'http://localhost:3000/api';
const USER_URL = `${API_URL}/user`;
const REGISTER_URL = `${API_URL}/register`;
const LOGIN_URL = `${API_URL}/login`;
const PODCASTS_URL = `${API_URL}/podcasts`;
const FEED_URL = `${PODCASTS_URL}/feed`;
const EPISODES_URL = `${PODCASTS_URL}/episodes`;

/* eslint-disable */

const AUTH_HEADER = () => new Headers({
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
      headers: AUTH_HEADER(),
    }).then(res => res.json())
  ),
  updateUser: updateHash => (
    fetch(USER_URL, {
      method: 'PUT',
      headers: AUTH_HEADER(),
      body: JSON.stringify({ data: updateHash }),
    }).then(res => res.json())
  ),
  register: (email, password) => (
    fetch(REGISTER_URL, {
      method: 'POST',
      headers: NON_AUTH_HEADER,
      body: JSON.stringify({ email, password }),
    }).then(res => res.json())
  ),
  login: (email, password) => (
    fetch(LOGIN_URL, {
      method: 'POST',
      headers: NON_AUTH_HEADER,
      body: JSON.stringify({ email, password }),
    }).then(res => res.json())
  ),
  getPodcasts: () => (
    fetch(PODCASTS_URL, {
      method: 'GET',
      headers: AUTH_HEADER(),
    }).then(res => res.json())
  ),
  getFeed: metaEpisodes => (
    fetch(FEED_URL, {
      method: 'POST',
      headers: AUTH_HEADER(),
      body: JSON.stringify({ metaEpisodes }),
    }).then(res => res.json())
  ),
  getEpisodes: metaEpisode => (
    fetch(EPISODES_URL, {
      method: 'POST',
      headers: AUTH_HEADER(),
      body: JSON.stringify({ metaEpisode }),
    }).then(res => res.json())
  ),
};

export default PodderApi;
