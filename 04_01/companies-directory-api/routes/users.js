var express = require('express');
const { store, login } = require('../controllers/userController');
var router = express.Router();

router.post('/register', store);
router.post('/login', login);

module.exports = router;