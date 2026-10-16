const seq = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const sequelize = new seq.Sequelize(
    process.env.MYSQL_URL,
    {
        dialect: "mysql",
        logging: false
    }
);

module.exports = sequelize;