const Users = require ("../models/users.model.js")
const bcrypt = require("bcryptjs")

const CreateUser = async (req,res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({message: "All fields are required"});
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({ name: name, email :email, password: hashedPassword });
    return res.status(200).json({message: "User created successfully" , user: newUser});
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}

const CheckUser = async (req,res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({message: "All fields are required"});
    }
    try {
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: "Invalid password"});
        }
        return res.status(200).json({message: "User authenticated successfully"});
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}

const DeleteUser = async (req,res) => {
    const { email } = req.params;
    if (!email) {
        return res.status(400).json({message: "Email is required"});
    }
    try {
        const deletedUser = await Users.destroy({ where: { email } });
        if (!deletedUser) {
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}

module.exports = DeleteUser;
module.exports = CreateUser;
module.exports = CheckUser;