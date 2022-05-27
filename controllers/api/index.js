const router = require('express').Router();

const single_post_routes = require('./single-post-routes');

router.use('/post', single_post_routes);

module.exports = router;