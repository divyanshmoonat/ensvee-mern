const http = require("http");
const url = require('url');

// console.log("My first node application");
/* 
    1. Create a web server
    2. Create End Points
    3. Create REST APIs
*/

const serverCallback = (req, res) => {
    // console.log(req.url);
    const urlData = url.parse(req.url);
    console.log(urlData);
  res.statusCode = 200; // Everything is fine
  res.setHeader('Content-Type', 'text/plain'); // To inform client about the type of data the server is sending in response
//   res.setHeader("Content-Type", "application/json"); // To inform client about the type of data the server is sending in response
  const data = [
    {
      fName: "John",
      lName: "Doe",
    },
  ];
//   res.end(data);
  res.end("This is my First NodeJS Application with Nodemon"); // Actual data to be sent
};
const server = http.createServer(serverCallback);

server.listen(5000, "127.0.0.1", () => {
  console.log("Server is up and running and listening on port 5000");
});

// http://localhost:3000/getItems

// Request : HTTP METHODS : GET,POST,PUT,DELETE
// Response : HTTP Code : 1xx,2xx---5xx

// Live Reloading/Hot Reloading
