// @flow
/* eslint no-restricted-globals: 0 */

import EventEmitter from 'events';
import decode from 'jwt-decode';
import qs from 'querystring';
import debug from 'debug';

const debugAuth = debug('NTCH:Auth');

export const AuthState = {
  INIT: 'AUTH/INIT',
  GUEST: 'AUTH/GUEST',
  LOGINED: 'AUTH/LOGINED',
};

export const AuthEvents = {
  STATE_CHANGED: 'AE/STATE_CHANGED',
  ACCESS_TOKEN_UPDATED: 'AE/ACCESS_TOKEN_UPDATED',
};

type AuthStateType = typeof AuthState.GUEST | typeof AuthState.LOGINED;

class AuthStore extends EventEmitter {
  static REFRESH_FREQUENCY = 1000 * 60 * 60 * 24

  privateState: AuthStateType = AuthState.INIT

  privateAccessTokem: ?string = null

  refreshTokenInterval: ?IntervalID = null

  constructor() {
    super();

    this.initializeAccessToken();
  }

  set state(newState: AuthStateType) {
    this.privateState = newState;

    this.emit(AuthEvents.STATE_CHANGE, newState);

    debugAuth(`Auth State Changed ${newState}`);
  }

  get state() {
    return this.privateState;
  }

  set accessToken(newToken: ?string) {
    this.privateAccessTokem = newToken;

    this.emit(AuthEvents.ACCESS_TOKEN_UPDATED, newToken);

    debugAuth('Access Token Updated.');

    if (newToken && this.state !== AuthState.LOGINED) {
      this.state = AuthState.LOGINED;
    } else if (!newToken && this.state === AuthState.LOGINED) {
      this.state = AuthState.GUEST;
    }
  }

  get accessToken() {
    if (!this.privateAccessTokem) return null;

    const { exp } = decode(this.privateAccessToken);

    if (Math.floor(Date.now() / 1000) > exp) {
      this.privateAccessToken = null;

      return null;
    }

    return this.privateAccessToken;
  }

  bindClient(client) {
    this.client = client;
  }

  logout() {
    localStorage.removItem('refreshToken');

    this.accessToken = null;

    this.state = AuthState.GUEST;
  }

  async initializeAccessToken() {
    const {
      token,
      supportToken,
    } = qs.parse(location.search.replace(/^\?/, ''));

    const refreshToken = token || localStorage.getItem('refreshToken') || supportToken;

    if (refreshToken) {
      const { exp } = decode(refreshToken);

      localStorage.setItem('refreshToken', refreshToken);

      if (exp * 1000 > Date.now()) {
        await this.updateAccessToken(refreshToken);
      }
    } else {
      this.state = AuthState.GUEST;
    }
  }

  getPermissions() {
    if (this.state !== AuthState.LOGINED || !this.accessToken) return {};

    const { permissions } = decode(this.accessToken);

    return permissions;
  }
}

const authStore = new AuthStore();

authStore.setMaxListeners(300);

export default authStore;
