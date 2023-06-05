const mailer = require("nodemailer");
// fmugerrfvzxsbngf

const Sendmail= (emails)=>{

  return new Promise(async(resolove, reject)=>{


    let transporter = mailer.createTransport({
        service: "gmail",
    auth: {
      user: process.env.gmailuser,
      pass: process.env.gmailpassword,
        },
      });

      let info = {
        from: process.env.gmailuser,
    to: emails.join(","),
    subject: "new2",
    text: "You are getting this mail from node js",
      };

      await transporter.sendMail(info, (error,info)=>{
        if (error) return reject('error');
        return resolove('success');


      });
     
  })

  
  
    
    }
module.exports = {Sendmail}