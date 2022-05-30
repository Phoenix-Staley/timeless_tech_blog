const router = require('express').Router();

const session_routes = require("./session-routes");
const comment_routes = require("./comment-routes");
const new_post_routes = require("./new-post-routes");

router.use("/users", session_routes);
router.use("/comments", comment_routes);
router.use("/posts", new_post_routes);

module.exports = router;