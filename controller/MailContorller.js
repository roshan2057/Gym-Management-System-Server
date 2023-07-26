const mailer = require("nodemailer");

  let transporter = mailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.gmailuser,
        pass: process.env.gmailpassword,
      },
    });

const Sendmail = (email, message) => {

  return new Promise(async (resolove, reject) => { 

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



const welcomemail =(email)=>{
  return new Promise(async (resolove, reject) => { 

    let info = {
      from: process.env.gmailuser,
      to: email,
      subject: "Sucessfully registered",
      html: "<h1>Welcome to Rhino Gym center!</h1>"};

    await transporter.sendMail(info, (error, info) => {
      if (error) return reject('error');
      return resolove(info);


    });

  })
}



const forgetmail =(email,name,token)=>{
  return new Promise(async (resolove, reject) => { 

    let info = {
      from: process.env.gmailuser,
      to: email,
      subject: "Rhino Gym Center",
      html: "<p>Hi "+name+", Click the link to reset your password <a href="+`${process.env.client_url}?email=${email}&token=${token}`+">Goto</a></p>"};

    await transporter.sendMail(info, (error, info) => {
      if (error) return reject('error');
      return resolove(info);


    });

  })
}
module.exports = { Sendmail,forgetmail,welcomemail }