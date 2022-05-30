const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const with_auth = require("../../utils/auth");

router.post("/", with_auth, async (req, res) => {
    try {
        const comment = await Comment.create({
            body: req.body.comment,
            post_id: req.body.post_id,
            date_posted: req.body.date_posted,
            commenter_id: req.session.user_id
        });

        res.status(201).json(comment);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;