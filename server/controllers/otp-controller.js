export const VerifyOTP = async (req, res) => {
  const { otp } = req.body;
  if (!otp) {
    return res.status(400).json({ success: false, message: "OTP is required" });
  }

  const CORRECT_OTP = "123456";

  if (otp === CORRECT_OTP) {
    return res.json({ success: true, message: "OTP Verified Successfully" });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Invalid OTP, Please Try Again" });
  }
};
