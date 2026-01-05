// backend/controllers/leaderboardController.js
// Controller for fetching leaderboard data based on GPA

const User = require("../models/User");

exports.getLeaderboard = async (req, res) => {
  try {
    const { filter, university, course, specialization } = req.query;
    
    // Build query based on filter
    let query = { gpa: { $ne: null, $gt: 0 } }; // Only users with GPA set
    
    if (filter === "university" && university) {
      query.university = university;
    } else if (filter === "course" && course) {
      query.course = course;
    } else if (filter === "specialization" && specialization) {
      query.specialization = specialization;
    }
    // If filter is "all", no additional filtering

    // Fetch top 10 users sorted by GPA (descending)
    const topUsers = await User.find(query)
      .select("firstName lastName profileImage gpa university course specialization")
      .sort({ gpa: -1 })
      .limit(10)
      .lean();

    // Format response
    const leaderboard = topUsers.map((user) => ({
      _id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      profileImage: user.profileImage,
      gpa: user.gpa,
      university: user.university,
      course: user.course,
      specialization: user.specialization,
    }));

    res.json({
      success: true,
      leaderboard,
      filter,
    });
  } catch (error) {
    console.error("Leaderboard Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
