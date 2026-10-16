const CreateUser = require ("../controllers/users.controller.js")
const DeleteUser = require ("../controllers/users.controller.js")
const CheckUser = require ("../controllers/users.controller.js")
const express = require('express');

const Users = express.Router();

Users.post("/create", CreateUser)
Users.get("/check", CheckUser)
Users.delete("/delete/:email", DeleteUser)

module.exports = Users;


