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
    let posts = post_data.map(post => post.get({ plain: true }));
    posts = posts.map(post => {
        post.is_current_user = true;
        return post;
    });
    res.render("home_dashboard", { posts: posts, logged_in: req.session.logged_in });
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
    res.render("add_update_post");
});

router.get("/update_post/:id", with_auth, async (req, res) => {
    try {
        const post_data = await Post.findByPk(req.params.id, {
            include: [{ model: User }]
        });
        const post = post_data.get({ plain: true });
        if (req.session.user_id !== post.user_id) {
            res.status(401).json({ message: "This message was posted by a different account." });
            return;
        }
        res.render("add_update_post", { post });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;