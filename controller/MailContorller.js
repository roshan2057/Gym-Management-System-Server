const mailer = require("nodemailer");

const Sendmail = (email, message) => {

  return new Promise(async (resolove, reject) => {


    let transporter = mailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.gmailuser,
        pass: process.env.gmailpassword,
      },
    });

    let info = {
      from: process.env.gmailuser,
      to: email.join(","),
      subject: "Rhino Gym Center",
      text: message,
    };

    await transporter.sendMail(info, (error, info) => {
      if (error) return reject('error');
      return resolove('success');


    });

  })




}
module.exports = { Sendmail }