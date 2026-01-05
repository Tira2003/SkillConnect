// backend/controllers/profileController.js

const User = require("../models/User");

/**
 * GET USER PROFILE
 */
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

/**
 * UPDATE USER PROFILE
 */
exports.updateProfile = async (req, res) => {
    try {
        const allowed = [
            "profileImage",
            "coverImage",
            "headline",
            "pronouns",
            "university",
            "course",
            "specialization",
            "about",
            "skills",
            "portfolioLinks",
        ];
        const update = {};
        for (const key of allowed) {
            if (Object.prototype.hasOwnProperty.call(req.body, key)) {
                update[key] = req.body[key];
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { $set: update },
            { new: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user: updatedUser });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
