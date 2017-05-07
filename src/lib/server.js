const {
  EventEmitter
} = require('events');
const weixinApi = require('./weixin-api');

/**
 * @fires refreshed - token
 * @fires error - err
 * 
 * @class AccessToken
 * @extends {EventEmitter}
 */
class AccessToken extends EventEmitter {
  constructor(appid, secret) {
    super();
    this._appid = appid;
    this._secret = secret;
    this._token = null;
  }
  /**
   * refresh access token in x seconds
   * 
   * @param {Number} sec 
   * 
   * @memberOf AccessToken
   */
  _refreshIn(sec) {
    setTimeout(() => {
      weixinApi.fetchAccessToken(this._appid, this._secret)
        .then(res => {
          this._token = res.access_token;
          this.emit('refreshed', this._token);
          this._refreshIn(res.expires_in);
        })
        .catch(err => {
          this.emit('error', err)
        })
    }, (sec / 3 * 2) * 1000)
  }
  async get() {
    if (this._token) {
      return this._token;
    } else {
      const res = await weixinApi.fetchAccessToken(this._appid, this._secret);
      this._refreshIn(res.expires_in);
      this._token = res.access_token;
      return res.access_token;
    }
  }
}

module.exports = {
  AccessToken
}