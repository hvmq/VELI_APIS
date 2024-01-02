import nodemailer from "nodemailer";
export const TransporterService = {
  transporter: nodemailer.createTransport({
    service: "gmail",
    service: "gmail",
    port: 465,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  }),
};
