const express = require("express");
const router = express.Router();
const controllers  = require("../controllers")

router.get("/me", controllers.getUserData);

router.post("/signup", controllers.createUser);
router.post("/login", controllers.FindUser);

module.exports = router;