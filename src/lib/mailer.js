import nodemailer from "nodemailer";

export const sendResetEmail = async (to, token) => {
  const resetUrl = `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/reset-password?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  await transporter.sendMail({
    from: `"My App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Reset Your Password",
    html: `
      <p>You requested a password reset.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link will expire in 1 hour.</p>
    `,
  });
};
