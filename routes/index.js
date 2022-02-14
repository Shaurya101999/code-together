const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
const userController = require('../controllers/user_controller');
const passport = require('passport');


router.get('/', homeController.home);
// router.get('/sign-up', homeController.signUp);
// router.get('/sign-in', homeController.signIn);
// router.post('/create-user', homeController.createUser);

// router.post('/create-session', passport.authenticate(
//     'local',
//     {failureRedirect: 'sign-in'}
// ), homeController.createSession);

router.use('/user', require('./user'));
router.use('/code', passport.checkAuthentication , require('./code'));

module.exports = router ;