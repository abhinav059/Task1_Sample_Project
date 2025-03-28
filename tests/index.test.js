const http = require('http');
const request = require('supertest');

const server = require('../index'); // Ensure the path is correct

describe('GET /', () => {
  it('Server should return status code 200', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });
});
