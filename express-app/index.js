const express = require("express"); // Step 1 : Import express module
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/users");

const app = express(); // Step 2 : Create express app

const jsonParser = bodyParser.json();
app.use(jsonParser); // Middleware

// DB Connection
//                driver://dbhost:dbport/dbname
mongoose
  .connect("mongodb://localhost:27017/todos")
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("Error in Connecting with MongoDB", err);
  });

// API End points (module wise)

app.use(`/api/v1/users`, userRoutes);
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

// Step 4 : Register your app on a port
app.listen(5000, () => {
  console.log("Server is up and running on Port 5000");
});
