/* eslint-disable no-param-reassign */
import moment from 'moment';

const AuthPlugin = {
  setToken(token, expiration, user) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('authTokenExpiration', expiration);
    localStorage.setItem('userId', user);
  },
  getToken() {
    const token = localStorage.getItem('authToken');
    const expiration = localStorage.getItem('authTokenExpiration');
    if (!token || !expiration) return null;
    if (moment() - moment(new Date(expiration)) > 0) {
      this.destroyToken();
      return null;
    }
    return token;
  },
  destroyToken() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authTokenExpiration');
    localStorage.removeItem('userId');
  },
  loggedIn() {
    if (this.getToken()) return true;
    return false;
  },
};
export default (Vue) => {
  Vue.auth = AuthPlugin;
  Object.defineProperties(Vue.prototype, {
    $auth: {
      get() {
        return Vue.auth;
      },
    },
  });
};
