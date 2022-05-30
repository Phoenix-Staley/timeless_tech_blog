const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const with_auth = require("../../utils/auth");

router.post("/", with_auth, async (req, res) => {
    try {
        const comment_body = {
            body: req.body.comment,
            post_id: req.body.post_id,
            commenter_id: req.session.user_id
        }
        const comment = await Comment.create(comment_body);

        res.status(201).json(comment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;