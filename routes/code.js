const express = require('express');
const router = express.Router();
const passport = require('passport');
const codeController = require('../controllers/code_controller');

router.get('/screen', codeController.home);

module.exports = router ;