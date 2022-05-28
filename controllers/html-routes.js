const router = require("express").Router();
const { Post, User } = require("../models");
const with_auth = require("../utils/auth");

router.get("/", async (req, res) => {
    const postData = await Post.findAll({ include: User});
    const posts = postData.map(post => post.get({ plain: true }));
    res.render("home_dashboard", { posts });
});

router.get("/post/:id", with_auth, async (req, res) => {
    const postData = await Post.findByPk(req.params.id, { include: [{
            model: User
        },
        {
            model: Comment,
            include: User
        }]
    });
    const post = postData.get({ plain: true });
    res.render("single-post", { post });
});

router.get("/login", async (req, res) => {
    res.render("login");
});

router.get("/sign_up", async (req, res) => {
    res.render("sign_up");
});

module.exports = router;