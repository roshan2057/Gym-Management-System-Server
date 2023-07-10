const express = require("express");
const router = express.Router();
const { RegisterController, LoginController, FeeController, Profilecontroller, Viewpackagecontroller, Updateprofile, Statementcontroller, ChangepwdController, Bmicontroller, Updatebmicontroller } = require("../controller/UserController");
const auth = require("../middleware/Auth");
const Khalticontroller = require("../controller/KhaltiController");
const { Codcontroller } = require("../controller/CodController");


router.post("/register", RegisterController);
router.post("/login", LoginController);


router.get("/fee", auth, FeeController);
router.get('/statement', auth, Statementcontroller);

router.route("/profile")
    .put(auth, Updateprofile)
    .get(auth, Profilecontroller)

router.route("/bmi")
    .get(auth, Bmicontroller)
    .put(auth, Updatebmicontroller)


router.post("/payment/khalti", auth, Khalticontroller);
router.post("/payment/cod", auth, Codcontroller)

router.get("/viewpackage", Viewpackagecontroller);

router.put("/changepassword", auth, ChangepwdController)


router.route('/check')
    .get((req, res) => {
        res.send("get");
    })
    .post((req, res) => {
        res.send("post");

    })



module.exports = router