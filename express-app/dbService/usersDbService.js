const mongoose = require("mongoose");

const Users = require("../models/users");

const createNewUser = async (userObj) => {
  return await new Users(userObj).save();
  // db.users.insert({...userObj});
};

const listUsers = async (searchKey) => {
  return await Users.find();
  // db.users.find();
  // $or : []
};

const findUserById = async (userId) => {
  return await Users.findOne({ _id: mongoose.Types.ObjectId(userId) });
  // db.users.findOne({_id: "asd89fasd"});
};

module.exports = {
  createNewUser,
  listUsers,
  findUserById,
};
