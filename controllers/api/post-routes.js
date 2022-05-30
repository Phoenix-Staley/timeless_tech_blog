const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const with_auth = require("../../utils/auth");

router.post("/new_post", with_auth, async (req, res) => {
    try {
        if (!req.body.title || !req.body.post_body) {
            res.status(400).json({ message: "Posts need a title and a body!" });
        }

        const new_post = await Post.create({
            title: req.body.title,
            body: req.body.post_body,
            date_posted: req.body.date_posted,
            user_id: req.session.user_id
        });

        res.status(201).json(new_post);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post("/update/:id", with_auth, async (req, res) => {
    try {
        if (!req.body.title || !req.body.post_body) {
            res.status(400).json({ message: "Posts need a title and a body!" });
        }

        const old_post = await Post.findByPk(req.params.id);
        const updated_post = await old_post.update({
            title: req.body.title,
            body: req.body.post_body
        });

        res.status(201).json(updated_post);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;