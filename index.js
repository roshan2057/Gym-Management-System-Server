//  ps -e|grep node kill node process(pkill node)


const express = require("express");
const bodyparser = require("body-parser");
const UserRoute = require("./routes/UserRoute");
const AdminRoute = require("./routes/AdminRoute");
const cors = require("cors");
const auth = require("./middleware/Auth");
const khalti = require("./controller/KhaltiController");
const app= express();
const port = 8000;



app.use(bodyparser.json());
app.use(cors());

app.use("/user", UserRoute);
app.use("/admin",AdminRoute)


app.get("/",(req, res)=>{
    res.send("This is the Project of Roshan you are getting replay form a server");
})


app.get("/check",auth,(req, res)=>{
    res.send("token");
})

app.get("/khalti",khalti)

app.all('*', (req, res) => {
    res.status(404).send('<h1>404! Page not found</h1>');
  });

app.listen(port,()=>{
    console.log("server runnint at "+port)
})