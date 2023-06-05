//  ps -e|grep node kill node process(pkill node)


const express = require("express");
const bodyparser = require("body-parser");
const UserRoute = require("./routes/UserRoute");
const AdminRoute = require("./routes/AdminRoute");
const cors = require("cors");
const job = require("node-cron");
const auth = require("./middleware/Auth");
const khalti = require("./controller/KhaltiController");
const { Sendmail } = require("./controller/MailContorller");
const app = express();
const port = 8000;
require('dotenv').config();


app.use(bodyparser.json());
app.use(cors());

app.use("/user", UserRoute);
app.use("/admin", AdminRoute)


app.get("/", (req, res) => {
    console.log(process.env.khaltisecretkey)
    res.send("This is the Project of Roshan you are getting replay form a server");
})


app.get("/check", auth, (req, res) => {
    res.send("token");
})

// job.schedule("*/15 * * * * *", function () {
//     console.log("job");
// });



app.get("/gmail",(req,res)=>{


    let emails = ["ropep25966@jobbrett.com", "roshankarki1276@gmail.com"];

   Sendmail(emails)
   .then(response=>{
    console.log(response);
    res.send("success");
   })
   .catch(error=>{
    console.log(error)
   })
})


app.get("/khalti", khalti)

app.all('*', (req, res) => {
    res.status(404).send('<h1>404! Page not found</h1>');
});

app.listen(port, () => {
    console.log("server runnint at " + port)
})