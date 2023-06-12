const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const Transporter = nodemailer.createTransport({
    port: process.env.SMPT_PORT,
    host: process.env.SMPT_HOST,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_USER,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const MailOPtion = {
    from: process.env.SMPT_USER,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await Transporter.sendMail(MailOPtion);
};

module.exports = sendEmail;
