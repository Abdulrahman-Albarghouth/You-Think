const express = require("express");
const router = express.Router();
const controllers  = require("../controllers")


router.get("/", controllers.getALlItems)
router.get("/:id", controllers.getSingleItem)
router.get("/categoryes/:id", controllers.getItemsByCategorye)
router.delete("/:id", controllers.deleteItem)
router.post("/", controllers.createItem)
router.put("/:id", controllers.updateItem)

module.exports = router;