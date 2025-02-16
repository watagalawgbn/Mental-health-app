const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { sendResetEmail } = require("../helpers/mailer");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate unique reset token using user's current password hash as part of the secret
    const secret = process.env.JWT_SECRET + user.password;
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '15m' });
    
    // Create password reset URL
    const resetURL = `${process.env.CLIENT_URL}/reset-password?id=${user._id}&token=${token}`;

    // Send reset email
    await sendResetEmail(user.email, resetURL);
    res.json({ 
      ok: true,
      message: "Password reset link has been sent to your email" 
    });
  } catch (err) {
    console.log("Forgot password error:", err);
    res.status(500).json({ error: "Error sending password reset email" });
  }
};

module.exports = {
  forgotPassword
};