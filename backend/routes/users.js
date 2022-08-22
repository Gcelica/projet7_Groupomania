const express = require("express");
const userCtrl = require("../controllers/users");

const router = express.Router();

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
