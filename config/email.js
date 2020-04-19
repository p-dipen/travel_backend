/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
const nodemailer = require("nodemailer");
require("dotenv").config();
const Email = require("email-templates");

const environment = process.env;
const sender = "smtps://" + environment.EMAILID;
const password = environment.SMTP_USER_PASSWORD;
const transporter = nodemailer.createTransport({
  host: "",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: environment.SMTP_USER_NAME,
    pass: environment.SMTP_USER_PASSWORD
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
});
const email = new Email({
  transport: transporter,
  send: false,
  preview: true,
  views: {
    options: {
      extension: "ejs"
    },
    root: "views/email/"
  }
});

// nodeMailer.createTransport(sender + ":" + password + "@smtp.push-x.com");
const sendactivateCode = function(emailaddress, username, name, tokenUrl) {
  // transporter.template
  try {
    email
      .send({
        template: "activate",
        message: {
          from: "Push-x <" + environment.SMTP_USER_NAME + ">",
          to: emailaddress
        },
        locals: {
          name: username,
          token: tokenUrl
        }
      })
      .then(() => console.log("email has been send!"));
  } catch (err) {
    console.log(err);
  }
};
const SMTPTransport = nodemailer.createTransport({
  host: environment.SMTP_SERVICE_HOST,
  port: environment.SMTP_SERVICE_PORT,
  secure: environment.SMTP_SERVICE_SECURE, // upgrade later with STARTTLS
  debug: true,
  auth: {
    user: environment.SMTP_USER_NAME,
    pass: environment.SMTP_USER_PASSWORD
  }
});

const ViewOption = (transport, hbs) => {
  transport.use(
    "compile",
    hbs({
      viewPath: "views/email",
      extName: ".hbs"
    })
  );
};

module.exports = {
  SMTPTransport,
  ViewOption,
  sendactivateCode
};