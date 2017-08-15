import history from '../plugins/history';

const jwtId = 'jwt';

const SessionHandler = {
  saveJwt: (token) => {
    sessionStorage.setItem(jwtId, token);
    history.push('/feed');
  },
  removeJwt: () => sessionStorage.removeItem(jwtId),
  getJwt: () => {
    if (sessionStorage.getItem(jwtId)) {
      return sessionStorage.getItem(jwtId).replace('JWT ', '');
    }
  },
};

export default SessionHandler;
