import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user)
      return res.status(404).json({ msg: "User not found", success: false });

    res.status(200).json({ user, success: true });
  } catch (err) {
    console.error("Get Profile Error:", err);
    res.status(500).json({ msg: "Server error", success: false });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");

    if (!user)
      return res.status(404).json({ msg: "User not found", success: false });

    res.status(200).json({ user, msg: "Profile updated", success: true });
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({ msg: "Server error", success: false });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ msg: "User not found", success: false });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ msg: "Incorrect current password", success: false });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res
      .status(200)
      .json({ msg: "Password updated successfully", success: true });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ msg: "Server error", success: false });
  }
};
