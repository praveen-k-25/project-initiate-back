const { transporter } = require("../configs/mailConfig");

const sendOtpMail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `<${process.env.EMAIL_USER}>`,
      to: email,
      subject: "OTP Verification Code",
      html: `<div style="font-family:Arial,sans-serif;">
        <h2>OTP Verification</h2>
        <p>Your One-Time Password is:</p>
        <h1 style="color:#2e6c80;">${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
      </div>`,
    });
  } catch (err) {
    return false;
  }
  return true;
};

module.exports = { sendOtpMail };
