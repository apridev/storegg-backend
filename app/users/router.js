var express = require('express');
var router = express.Router();
const {viewSignin, actionSingin, actionLogout} = require('./controller')

/* GET home page. */
router.get('/', viewSignin);
router.post('/', actionSingin);
router.get('/logout', actionLogout);

module.exports = router;
