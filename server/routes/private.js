const router = require('express').Router();

const { protected } = require('../middleware/protected')

const { getPrivateData } = require('../controllers/private')

router.get('/', protected, getPrivateData)

module.exports = router;