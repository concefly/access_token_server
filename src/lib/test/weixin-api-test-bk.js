const {
  expect
} = require('chai');
const api = require('../weixin-api');
const config = require('config');

const appid = config.get('appid');
const secret = config.get('appsecret')

describe('TEST weixin api', () => {
  describe('fetchAccessToken', () => {
    it('should response with token and expires', done => {
      api.fetchAccessToken(appid, secret)
        .then(res => {
          expect(res).to.have.property('access_token');
          expect(res).to.have.property('expires_in');
          done()
        })
        .catch(done)
    })
    it('should throw error if using invalid param', done => {
      api.fetchAccessToken('appid', 'secret')
        .catch(err => {
          expect(err).to.have.property('errcode');
          expect(err).to.have.property('errmsg');
          done();
        })
        .catch(done)
    })
  })
})