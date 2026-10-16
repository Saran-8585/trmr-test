const link = require('../controllers/link.controller');
const express = require('express');

const Link = express.Router();

Link.post('/create', link.CreateLink);
Link.delete('/delete/:trmd_link', link.DeleteLink);

module.exports = Link;