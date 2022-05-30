const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const with_auth = require("../utils/auth");

router.get("/", async (req, res) => {
    const post_data = await Post.findAll({ include: User});
    const posts = post_data.map(post => post.get({ plain: true }));
    res.render("home_dashboard", { posts: posts, logged_in: req.session.logged_in });
});

router.get("/dashboard", with_auth, async (req, res) => {
    const post_data = await Post.findAll({
        include: User,
        where: { user_id: req.session.user_id }
    });
    const posts = post_data.map(post => post.get({ plain: true }));
    res.render("home_dashboard", { posts: posts, logged_in: req.session.logged_in })
});

router.get("/post/:id", with_auth, async (req, res) => {
    const post_data = await Post.findByPk(req.params.id, { include: [{
            model: User
        },
        {
            model: Comment,
            include: User
        }]
    });
    const post = post_data.get({ plain: true });
    res.render("single-post", { post: post, logged_in: req.session.logged_in });
});

router.get("/login", async (req, res) => {
    res.render("login");
});

router.get("/sign_up", async (req, res) => {
    res.render("sign_up");
});

module.exports = router;