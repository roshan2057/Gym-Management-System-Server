const express = require("express");
const bodyparser = require("body-parser");
const UserRoute = require("./routes/UserRoute");
const cors = require("cors");
const auth = require("./middleware/Auth");
const app= express();
const port = 8000;


app.use(bodyparser.json());
app.use(cors());

app.use("/user", UserRoute);


app.get("/",(req, res)=>{
    res.send("replay form server");
})


app.get("/check",auth,(req, res)=>{
    res.send("token");
})


app.all('*', (req, res) => {
    res.status(404).send('<h1>404! Page not found</h1>');
  });

app.listen(port,()=>{
    console.log("server runnint at "+port)
})