const { register, login, ologin } = require('../controllers/auth');
const passport = require('passport');

const router = require('express').Router();

router.post('/register', register)

router.post('/login', login)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/redirect', passport.authenticate('google'), ologin)

module.exports = router;