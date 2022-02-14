const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user_controller');

router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.post('/create-user', userController.createUser);

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: 'sign-in'}
), userController.createSession);

router.get('/sign-out', userController.destroySession);
router.get('/',  userController.home);



module.exports = router ;