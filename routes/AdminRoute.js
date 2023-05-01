const express = require("express");
const router = express.Router();
const auth = require("../middleware/Auth");
const { LoginController, Addpackage, Updatepackage, Deletepackage, Viewmembers, Deletemember, Billcontroller } = require("../controller/AdminController");



router.post("/login",LoginController);

router.post("/addpackage", Addpackage);
router.put("/updatepackage/:id",Updatepackage);
router.delete("/deletepackage/:id",Deletepackage);

router.get("/members",Viewmembers);
router.delete("/deletemember/:id",Deletemember);

router.get("/bill",Billcontroller);


router.route('/check')
.get((req, res)=>{
    res.send("get");
})
.post((req, res)=>{
    res.send("post");

})



module.exports = router