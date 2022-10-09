const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const userDbService = require("../dbService/usersDbService");

router.get("/list", async (req, res) => {
  try {
    const searchKey = req.query.search.toLowerCase();
    //   const users = usersList.filter(
    //     (user) =>
    //       user.name.toLowerCase().includes(searchKey) ||
    //       user.email.toLowerCase().includes(searchKey) ||
    //       user.username.toLowerCase().includes(searchKey)
    //   );
    const users = await userDbService.listUsers(searchKey);
    if (users.length === 0) {
      res.status(204).json();
    }
    res.json({
      success: true,
      users: users,
    });
  } catch (err) {
    console.log("Error in fetching users list", err);
    res.status(500).json({
      success: false,
      message: "Oops! Something went wrong, please try again after sometime.",
    });
  }
});

router.post("/create-user", async (req, res) => {
  //   console.log(req.body);
  // Save this data into DB.
  try {
    // LOGIN API IMPLEMENTATION BELOW
    // const salt = await bcrypt.genSalt(10);
    // const encryptedPassword = await bcrypt.hash(req.body.password, salt);
    // const isPasswordCorrect = await bcrypt.compare(
    //   "123456",
    //   "$2b$10$Yd/oRLBqR88qMPzDpl78xu/j2rh/uh1DU3eGgqx/FzVRa25hzyq6e"
    // );
    // if (isPasswordCorrect) {
    //   console.log("Correct password");
    // } else {
    //   res
    //     .status(401)
    //     .json({ success: false, message: "Invalid username or password" });
    //   console.log("Incorrect passsword");
    // }
    // console.log(salt);
    await userDbService.createNewUser({
      ...req.body,
      password: encryptedPassword,
    });
    res
      .status(201)
      .json({ success: true, message: "New user created successfully." });
  } catch (err) {
    console.log("Error in creating new user", err);
    res.status(500).json({
      success: false,
      message: "Oops something went wrong, please try again after sometime",
    });
  }
});

router.get("/getUserById/:id", async (req, res) => {
  const id = req.params.id;
  try {
    console.log(id);
    const user = await userDbService.findUserById(id);
    console.log(user);
    //   const user = usersList.find((user) => user.id == id);
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
  } catch (err) {
    console.log("Error in fetching user by id", err);
    res.status(500).json({
      success: false,
      message: "Oops! Something went wrong, please try again after sometime.",
    });
  }
});

module.exports = router;
