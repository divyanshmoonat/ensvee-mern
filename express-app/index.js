const express = require("express"); // Step 1 : Import express module
const bodyParser = require("body-parser");

const usersList = require("./mockData/users.json");

const app = express(); // Step 2 : Create express app

const jsonParser = bodyParser.json();
app.use(jsonParser); // Middleware

// Step 3 : Define API end points/routes

// app.<Method>(<EndPoint>,<CallBack Fn>);
app.get("/", (req, res) => {
  console.log("Hello from ExpressJS");
  //   res.send('Server is running fine');
  res.send({
    success: true,
    message: "Server is running fine",
  });
});

app.get("/users", (req, res) => {
  const output = {
    success: true,
    users: usersList,
  };

  res.status(200).json(output);
});

app.get("/getUserById/:id", (req, res) => {
  const id = req.params.id;
  const numericId = parseInt(id);
  if (!numericId) {
    return res.status(400).json({
      success: false,
      user: {},
    });
  }
  const user = usersList.find((user) => user.id == id);
  if (!user) {
    return res.status(404).json({
      success: false,
      user: {},
    });
  }
  // Dynamic REST EndPoint
  const output = {
    success: true,
    user: user,
  };
  res.json(output);
});

app.get("/user", (req, res) => {
  const searchKey = req.query.search.toLowerCase();
  const users = usersList.filter(
    (user) =>
      user.name.toLowerCase().includes(searchKey) ||
      user.email.toLowerCase().includes(searchKey) ||
      user.username.toLowerCase().includes(searchKey)
  );
  if (users.length === 0) {
    res.status(204).json();
  }
  res.json({
    success: true,
    users: users,
  });
  console.log(searchKey);
});

app.post("/create-user", (req, res) => {
  console.log(req.body);
  // Save this data into DB.
  res
    .status(201)
    .json({ success: true, message: "New user created successfully." });
});

// Step 4 : Register your app on a port
app.listen(5000, () => {
  console.log("Server is up and running on Port 5000");
});