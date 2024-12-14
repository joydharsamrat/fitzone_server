import nodemailer from "nodemailer";
import config from "../config";
import httpStatus from "http-status";
import AppError from "../error/appError";

export const sendEmail = async (
  template: string,
  to: string,
  subject: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // false for port 587
      auth: {
        user: config.sender_email,
        pass: config.sender_app_pass,
      },
      tls: {
        rejectUnauthorized: config.node_ENV === "production",
      },
    });

    const info = await transporter.sendMail({
      from: config.sender_email,
      to: to,
      subject: subject,
      html: template,
    });

    console.log("Email sent successfully:", info.messageId);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to send email");
  }
};
