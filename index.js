// const http = require('http');
// const port = process.env.PORT || 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   const msg = 'Hello Node!\n'
//   res.end(msg);
// });

// server.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}/`);
// });
// const http = require('http');

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.end(`
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>Welcome to Node.js</title>
//       <style>
//         body { 
//           font-family: Arial, sans-serif; 
//           background-color: #f0f8ff;
//           color: #333;
//           text-align: center;
//           margin-top: 100px;
//         }
//         h1 { color: #007bff; }
//       </style>
//     </head>
//     <body>
//       <h1>Hello!!!, Welcome to My Node.js App! 🚀</h1>
//       <p>This is a simple Node.js application with a stylish look.</p>
//     </body>
//     </html>
//   `);
// });

// server.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });

const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Welcome to Node.js</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          background-color: #f0f8ff;
          color: #333;
          text-align: center;
          margin-top: 100px;
        }
        h1 { color: #007bff; }
      </style>
    </head>
    <body>
      <h1>Hello guys!, Welcome to My Node.js App! 🚀</h1>
      <p>This is a simple Node.js application with a stylish look.</p>
    </body>
    </html>
  `);
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

module.exports = server; // Export the server for testing
