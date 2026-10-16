const express = require("express");
const dotenv = require("dotenv");
const Users = require("./routes/users.route.js");
const Link = require("./routes/link.route.js");
const sequelize = require("./db.js");
dotenv.config();

const app = express();
app.use(express.json());

//user route
app.use("/users", Users);
//link route
app.use("/link", Link);


sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
});



