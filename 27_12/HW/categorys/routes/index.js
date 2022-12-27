const express = require("express");
const router = express.Router();
const controllers  = require("../controllers")


router.get("/", controllers.getALlCategorys)
router.post("/", controllers.createCategory)

module.exports = router;