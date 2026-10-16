const { CreateUser, CheckUser, DeleteUser } = require('../controllers/users.controller');
const express = require('express');

const Users = express.Router();

Users.get("/create", CreateUser)
Users.get("/check", CheckUser)
Users.get("/delete/:email", DeleteUser)

module.exports = Users;


