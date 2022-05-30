const router = require('express').Router();

const session_routes = require("./session-routes");
const comment_routes = require("./comment-routes");

router.use("/users", session_routes);
router.use("/comments", comment_routes);

module.exports = router;