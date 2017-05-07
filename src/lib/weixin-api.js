const request = require('request-promise-native');

/**
 * fetch access token
 * @function
 * @param {String} appid
 * @param {String} secret
 * @return {Promise} - {access_token, expires_in}
 */
exports.fetchAccessToken = function (appid, secret) {
  return request({
      uri: 'https://api.weixin.qq.com/cgi-bin/token',
      qs: {
        grant_type: 'client_credential',
        appid,
        secret
      },
      json: true,
    })
    .then(res => {
      if (typeof res == 'undefined') {
        throw {
          errcode: '40013',
          errmsg: "invalid appid"
        }
      }
      if (res.hasOwnProperty('errcode')) {
        throw res
      } else {
        return res
      }
    })
}