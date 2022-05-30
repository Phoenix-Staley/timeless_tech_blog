const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const with_auth = require("../utils/auth");

function render_posts(post_data, req, res) {
    const posts = post_data.map(post => post.get({ plain: true }));
    res.render("home_dashboard", { posts: posts, logged_in: req.session.logged_in });
}

router.get("/", async (req, res) => {
    const post_data = await Post.findAll({ include: User, order: [["date_posted", 'DESC']] });
    render_posts(post_data, req, res);
});

router.get("/dashboard", with_auth, async (req, res) => {
    const post_data = await Post.findAll({
        include: User,
        where: { user_id: req.session.user_id }
    });
    render_posts(post_data, req, res);
});

router.get("/user/:id", with_auth, async (req, res) => {
    const post_data = await Post.findAll({
        include: User,
        where: { user_id: req.params.id }
    });
    render_posts(post_data, req, res);
});

router.get("/post/:id", with_auth, async (req, res) => {
    const post_data = await Post.findByPk(req.params.id, {
        include: [
            {
                model: User
            },
            {
                model: Comment,
                include: User
            }
        ],
        order: [["date_posted", 'DESC']]
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

router.get("/new_post", async (req, res) => {
    res.render("new_post");
});

module.exports = router;