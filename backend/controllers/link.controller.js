const Link = require('../models/links.model');

module.exports = CreateLink = async (req, res) => {
    const { url, trmd_link, user_id } = req.body;
    if (!url || !trmd_link || !user_id) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const newLink = await Link.create({ url, trmd_link, user_id });
        return res.status(200).json({ message: "Link created successfully", link: newLink });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = DeleteLink = async (req, res) => {
    const { trmd_link } = req.params;
    if (!trmd_link) {
        return res.status(400).json({ message: "Trmd link is required" });
    }
    try {
        const deletedLink = await Link.destroy({ where: { trmd_link } });
        if (!deletedLink) {
            return res.status(404).json({ message: "Link not found" });
        }
        return res.status(200).json({ message: "Link deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}