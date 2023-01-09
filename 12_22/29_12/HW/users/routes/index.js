const express = require("express");
const router = express.Router();
const controllers  = require("../controllers")
const { isAuth } = require("../../middlewares")

router.post("/signup", controllers.createUser);
router.post("/login", controllers.FindUser);

module.exports = router;