const sequelize = require('../db.js');

const { DataTypes } = require('sequelize');

const Link = sequelize.define('link', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    trmd_link: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    slug: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Link;
