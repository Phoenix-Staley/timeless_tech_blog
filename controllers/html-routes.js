const router = require("express").Router();
const { Post, User } = require("../../Model");

router.get("/", async (req, res) => {
    const posts = await Post.getAll();
    res.render("home_dashboard", { posts });
});

module.exports = router;