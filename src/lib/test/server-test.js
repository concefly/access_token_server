const {
  expect
} = require('chai');
const {
  AccessToken
} = require('../server');
const config = require('config');

const appid = config.get('appid');
const secret = config.get('appsecret')

function mockFetchAccessToken(appid, secret) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        access_token: (new Date).valueOf() + '',
        expires_in: '2'
      })
    }, 1000)
  })
}

describe('TEST server', () => {

  describe('TEST AccessToken', () => {
    let accessToken = new AccessToken(appid, secret, mockFetchAccessToken);
    it('should return the token after having invoked get()', () => {
      return accessToken
        .get()
        .then(token => {
          expect(token).to.be.a('string')
        })
    })
    it('should refresh the token in expire time', () => {
      const fetch2token = async function () {
        const token1 = await accessToken.get();
        await new Promise(resolve => setTimeout(resolve, 3000));
        const token2 = await accessToken.get();
        return [token1, token2];
      }
      return fetch2token()
        .then(([t1, t2]) => {
          expect(t1).to.not.equal(t2)
        })
    })
  })

})