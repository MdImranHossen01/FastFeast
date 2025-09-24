import nodemailer from "nodemailer";

export const sendOtpEmail = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"FastFeast" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Login OTP",
    html: `
      <p>Use the code below to verify your login:</p>
      <h1 style="letter-spacing: 5px; text-align:center; font-size:35px;">${otp}</h1>
      <p>This code will expire in 2 minutes.</p>
    `,
  });
};
