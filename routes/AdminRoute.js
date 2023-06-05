const express = require("express");
const router = express.Router();
const auth = require("../middleware/Auth");
const { LoginController, Addpackage, Updatepackage, Deletepackage, Viewmembers, Deletemember, Billcontroller, Viewpackage } = require("../controller/AdminController");



router.post("/login",LoginController);


router.route('/product')
.get(Viewpackage)
.post(Addpackage);


router.route('/product/:id')
.put(Updatepackage)
.delete(Deletepackage)


router.get("/members",Viewmembers);
router.delete("/deletemember/:id",Deletemember);

router.get("/bill",Billcontroller);





module.exports = router