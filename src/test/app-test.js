const config = require('config');
const {
  expect
} = require('chai');
const request = require('supertest');
const createApp = require('../app');
const {
  app: log
} = require('../lib/log');

log.setLevel('off');

const app = createApp(
  config.get('register_token'),
  config.get('appid'),
  config.get('appsecret'),
  log
)

const agent = request.agent(app.callback());

describe('TEST app', () => {
  describe('/getAccessToken', () => {
    it('should response token', () => {
      return agent
        .get('/getAccessToken')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(res => {
          return Promise.all([
            expect(res.body).to.have.property('token')
          ])
        })
    })
  })
})