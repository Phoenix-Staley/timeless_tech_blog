const router = require("express").Router();
const { Post, User } = require("../../models");

router.get("/:id/", async (req, res) => {
    const postData = await Post.findByPk(req.params.id, { include: User});
    const post = postData.get({ plain: true });
    console.log(post);
    res.render("single-post", { post });
});

module.exports = router;