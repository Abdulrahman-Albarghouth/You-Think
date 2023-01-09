const express = require("express");
const router = express.Router();
const controllers  = require("../controllers")
const { isAuth } = require("../../middlewares")


router.get("/", isAuth, controllers.getALlPosts)
router.get("/:id", isAuth, controllers.getSinglePost)
router.get("/categoryes/:id", isAuth, controllers.getPostsByTag)
router.delete("/:id", isAuth, controllers.deletePost)
router.post("/", isAuth, controllers.createPost)
router.put("/:id", isAuth, controllers.updatePost)

module.exports = router;