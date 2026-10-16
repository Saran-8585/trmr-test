const CreateLink = require('../controllers/link.controller.js');
const DeleteLink = require('../controllers/link.controller.js');
const express = require('express');

const Link = express.Router();

Link.post('/create', CreateLink);
Link.delete('/delete/:trmd_link', DeleteLink);

module.exports = Link;