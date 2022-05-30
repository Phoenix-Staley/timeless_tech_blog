const router = require('express').Router();

const api_routes = require('./api');
const html_routes = require('./html-routes');

router.use('/', html_routes);
router.use('/api', api_routes);

module.exports = router;