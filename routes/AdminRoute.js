const express = require("express");
const router = express.Router();
const admin_auth = require("../middleware/Admin_auth");
const { LoginController, Addpackage, Updatepackage, Deletepackage, Viewmembers, Deletemember, Billcontroller, Viewpackage } = require("../controller/AdminController");



router.post("/login", LoginController);



router.get('/package', admin_auth, Viewpackage)

router.post('/package', admin_auth, Addpackage)

router.delete("/package/:id", Deletepackage)


router.put("/package/:id", Updatepackage)

router.get("/members", Viewmembers);
router.delete("/deletemember/:id", Deletemember);

router.get("/bill", Billcontroller);





module.exports = router