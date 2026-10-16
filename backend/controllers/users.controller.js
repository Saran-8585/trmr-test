const Users = require ("../models/users.model")


module.exports = CreateUser = async (req,res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({message: "All fields are required"});
    }
    try {
    const newUser = await Users.create({ name, email, password });
    return res.status(200).json({message: "User created successfully"});
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}

module.exports = DeleteUser = async (req,res) => {
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