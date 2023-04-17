const express = require("express");
const router = express.Router();
const {RegisterController, LoginController, DashboardController, FeeController} = require("../controller/UserController");
const auth = require("../middleware/Auth");

//for multiple request
// router.route('/data')
// .get(check)
// .post(register);


router.post("/register",RegisterController);
router.post("/login",LoginController);

router.get("/dashboard",auth ,DashboardController);

router.get("/fee",auth,FeeController)


router.route('/check')
.get((req, res)=>{
    res.send("get");
})
.post((req, res)=>{
    res.send("post");

})



module.exports = router