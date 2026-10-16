const con = require ("../controllers/users.controller")
const express = require('express');

const Users = express.Router()

Users.post("/create", con.CreateUser)
Users.delete("/delete/:email", con.DeleteUser)

module.exports = Users


