
const http = require('http');
const server = require('../index'); // Adjust path if necessary

test('Server should return status code 200', (done) => {
  const req = http.get('http://localhost:3000', (res) => {
    expect(res.statusCode).toBe(200);
    server.close(() => done()); // Close server and finish the test
  });
  req.on('error', (err) => {
    server.close(() => done(err)); // Ensure server closes on error
  });
});
