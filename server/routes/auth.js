const { register, login, ologin } = require('../controllers/auth');
const passport = require('passport');

const router = require('express').Router();

// ====================== HANDLING REGISTRATION ========================
router.post('/register', register)

// ========================== HANDLING LOGIN ================================
router.post('/login', login)

// =========================== GOOGLE ROUTE ============================
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// ======================== GOOGLE CALLBACK ROUTE ======================
router.get('/google/redirect', passport.authenticate('google'), ologin)

module.exports = router;