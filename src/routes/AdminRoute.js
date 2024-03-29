const express = require("express");
const router = express.Router();
const admin_auth = require("../middleware/Admin_auth");
const {
  LoginController,
  Addpackage,
  Updatepackage,
  Deletepackage,
  Viewmembers,
  Deletemember,
  Viewpackage,
  Codlist,
  Onlinelist,
  UserStatement,
  Acceptcod,
  Declinecod,
  Dashboard,
} = require("../controller/AdminController");

router.post("/login", LoginController);

router.get("/dashboard", admin_auth, Dashboard);

router.get("/package", admin_auth, Viewpackage);

router.post("/package", admin_auth, Addpackage);

router.delete("/package/:id", Deletepackage);

router.put("/package/:id", Updatepackage);

router.get("/members", Viewmembers);
router.delete("/deletemember/:id", Deletemember);

// router.get("/bill", Billcontroller);

router.get("/userstatement/:id", admin_auth, UserStatement);

router.get("/bill/cod", admin_auth, Codlist);

router.get("/bill/online/:id", admin_auth, Onlinelist);

router.get("/bill/cod/:id", admin_auth, Acceptcod);
router.delete("/bill/cod/:id", admin_auth, Declinecod);

module.exports = router;
