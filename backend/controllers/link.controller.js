const Link = require('../models/links.model.js');
const bcrypt = require('bcryptjs');
const nan= require('nanoid');
const dotenv = require('dotenv');
dotenv.config();
const CreateLink = async (req, res) => {
    const { url , user_id } = req.body;
    if (!url) {
        return res.status(400).json({ message: "URL is required" });
    }
    try {
        let existence = true;
        let slug= nan.nanoid(6);
        while (existence) {
            const existingLink = await Link.findOne({ where: { slug } });
            if (existingLink) {
                slug = bcrypt.hashSync(slug, 10).replace(/\//g, '').substring(0, 6);
            }
            if (!existingLink) {
                existence = false;
            }
        }
        const trmd_link = `${process.env.BASE_URL}/${slug}`; 
        const newLink = await Link.create({ url, trmd_link,slug: slug, user_id: user_id });
        return res.status(200).json({ message: "Link created successfully", link: newLink });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const findLink = async (req, res) => {
    const { user_id } = req.params;
    if (!user_id) {
        return res.status(400).json({ message: "User ID is required" });
    }
    try {
        const link = await Link.findOne({ where: { user_id } });
        if (!link) {
            return res.status(404).json({ message: "Link not found" });
        }
        return res.status(200).json({ link });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const DeleteLink = async (req, res) => {
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

module.exports = {  CreateLink, DeleteLink, findLink };
