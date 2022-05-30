const router = require('express').Router();

const session_routes = require("./session-routes");

router.use("/users", session_routes);

module.exports = router;