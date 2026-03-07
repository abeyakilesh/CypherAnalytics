const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

router.use(verifyToken);

router.get('/security', userController.getSecuritySettings);
router.put('/security', userController.updateSecuritySettings);
router.post('/apikeys', userController.generateApiKey);
router.delete('/apikeys/:keyId', userController.revokeApiKey);

module.exports = router;
