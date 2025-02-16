const User = require("../models/user");
const { hashPassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const resetPassword = async (req, res) => {
  try {
    const { id, token, password } = req.body;
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ error: "Invalid reset link" });
    }

    // Verify reset token
    const secret = process.env.JWT_SECRET + user.password;
    try {
      jwt.verify(token, secret);
    } catch (err) {
      return res.status(400).json({ error: "Invalid or expired reset link" });
    }

    // Validate new password
    if (!password || password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    // Update password
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    await user.save();

    res.json({ 
      ok: true,
      message: "Password has been successfully reset" 
    });
  } catch (err) {
    console.log("Reset password error:", err);
    res.status(500).json({ error: "Error resetting password" });
  }
};

module.exports = {
  resetPassword
};