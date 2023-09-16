//  ps -e|grep node kill node process(pkill node)

const express = require("express");
const bodyparser = require("body-parser");
const UserRoute = require("./routes/UserRoute");
const AdminRoute = require("./routes/AdminRoute");
const cors = require("cors");

const khalti = require("./controller/KhaltiController");
const { Sendmail } = require("./controller/MailContorller");
const db = require('./model/connect');
const Bill = require("./model/Bill");
const { Sequelize } = require("sequelize");

const app = express();
const port = 8000;
require("dotenv").config();

app.use(bodyparser.json());
app.use(cors());

// const cronJob = require('./controller/CronJob');
// // To start the cron job 
// // Automatic email sender
// cronJob();


const test= async ()=>{
    const today = new Date().toISOString().split('T')[0];

    Bill.findAll({
      attributes: ['user_id'],
      where: {
        expire_date: {
          [Sequelize.Op.lt]: today, // Use the less than operator
        },
      },
    })
      .then((results) => {
        const userIDs = results.map((result) => result.get('user_id'));
        console.log('User IDs with expire_date less than today:', userIDs);
      })
      .catch((err) => {
        console.error('Error:', err);
      });
    
    
};

// test();








app.use("/user", UserRoute);
app.use("/admin", AdminRoute);

app.get("/", (req, res) => {
  res.send(
    "This is the Project of Roshan you are getting replay form a server"
  );
});


app.post("/gmail", (req, res) => {
  // let emails = ["ropep25966@jobbrett.com", "roshankarki1276@gmail.com"];
  const email = [req.body.email];
  const message = req.body.message;

  Sendmail(email, message)
    .then((response) => {
      console.log(response);
      res.send("success");
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/khalti", khalti);

app.post('/check',(req,res)=>{
  // console.log(req.header('Authorization'))
  console.log("Card id =  "+req.body.id);
  res.send("Success")
  

})


app.all("*", (req, res) => {
  res.status(404).send("<h1>404! Page not found</h1>");
});

app.listen(port, () => {
  console.log("server runnint at " + port);
});
