const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Users = require("./routes/users.route.js");
const Link = require("./routes/link.route.js");
const sequelize = require("./db.js");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//user route
app.use("/users", Users);
console.log("User route loaded");
//link route
app.use("/link", Link);

app.get("/health", (req, res) => {
    console.log("Health check endpoint hit");
    res.send("Welcome to the Trmr API");
});


sequelize.sync().then(() => {
    app.listen(process.env.PORT, '0.0.0.0',() => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
});



