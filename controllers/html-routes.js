const router = require("express").Router();
const { Post, User } = require("../models");

router.get("/", async (req, res) => {
    const postData = await Post.findAll();
    const posts = postData.map(post => post.get({ plain: true }));
    res.render("home_dashboard", { posts });
});

module.exports = router;