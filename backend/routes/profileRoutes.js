const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 🔥 GET PROFILE
router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// 🔥 UPDATE PROFILE
router.put("/update/:email", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;