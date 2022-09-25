const http = require("http");
const url = require("url");
const fs = require("fs");

const usersList = require("./mockData/users.json");
const todosList = require("./mockData/todos.json");

// console.log("My first node application");
/* 
    1. Create a web server
    2. Create End Points
    3. Create REST APIs
*/

const serverCallback = (req, res) => {
  const urlData = url.parse(req.url);
  const urlParams = new URLSearchParams(urlData.search);
  // console.log(req.headers);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  // Generate a log file
  // fs.writeFile("myapplogs.log","utf8",(err,data) => {
  //   if(err) {
  //     console.log(err);
  //   }
  // })

  const logData = `${new Date()} PATH :  ${urlData.pathname} SEARCH PARAMS : ${
    urlData.search
  } \n`;
  // Write data to the same file
  fs.appendFile("myapplogs.log", logData, (err, data) => {
    console.log(err, data);
  });

  // To read a file
  fs.readFile("myapplogs.log", (err, data) => {
    if (err) throw new Error(err);
    console.log(data.toString());
  });

  fs.unlink("test.log", (err) => {
    if (err) throw new Error(err);
  });

  // 1. /users will give a list of users
  if (urlData.pathname === "/users") {
    const userId = urlParams.get("id");
    // console.log(typeof userId)
    if (userId) {
      const user = usersList.find((user) => user.id == userId);
      if (!user) {
        res.statusCode = 204;
      }
      res.end(JSON.stringify(user));
    } else {
      res.end(JSON.stringify(usersList));
    }
  } else if (urlData.pathname === "/todos") {
    const todoId = urlParams.get("id");
    if (todoId) {
      const todo = todosList.find((todo) => todo.id == todoId);
      if (!todo) {
        res.statusCode = 204;
        res.end();
      } else {
        res.end(JSON.stringify(todo));
      }
    } else {
      res.end(JSON.stringify(todosList));
    }
  } else {
    res.statusCode = 404;
    res.end("Page not found");
  }
};
const server = http.createServer(serverCallback);

server.listen(5000, "127.0.0.1", () => {
  console.log("Server is up and running and listening on port 5000");
});

// http://localhost:3000/getItems

// Request : HTTP METHODS : GET,POST,PUT,DELETE
// Response : HTTP Code : 1xx,2xx---5xx

// Live Reloading/Hot Reloading

/*
  JSON to String => JSON.stringify(<json-data>)
  String to JSON => JSON.parse(<string>)
*/

/*
  Create a Dashboard which will contain following features : 
    1. Create a Login API : WIll take username and password and generate a token and send it to the client.
    2. Create Users APIs : 
      2.1 List Users : List with following fields Email, name, phone, bloodGroup, address
      2.2 Create Users : Email, name, phone, bloodGroup, address
      2.3 Update/Edit Users : Email, name, phone, bloodGroup, address
      2.4 Delete Users : WIll mark user as inactive.
    3. System should generate logs for each user activity.
*/

// FILE CRUD Operation

// CCR (Client Side Rendering), SSR (Server Side Rendering)
