import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", success: false });

    res.status(200).json({
      message: "Profile fetched Successfully",
      data: user,
      success: true,
    });
  } catch (err) {
    console.error("Get Profile Error:", err);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates }, // replace only fields present in req.body,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", success: false });

    res
      .status(200)
      .json({ data: user, message: "Profile updated Successfully", success: true });
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", success: false });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Incorrect current password", success: false });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res
      .status(200)
      .json({ message: "Password updated successfully", success: true });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Server error", success: false });
  }
};
