const express = require('express');
const router = express.Router();
const u = require('../controllers/userController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

router.get('/watchlist', verifyToken, u.getWatchlist);
router.post('/watchlist/:contentId', verifyToken, u.addToWatchlist);
router.delete('/watchlist/:contentId', verifyToken, u.removeFromWatchlist);
router.get('/history', verifyToken, u.getHistory);
router.post('/history', verifyToken, u.addHistory);
router.put('/profile', verifyToken, u.updateProfile);
router.put('/change-password', verifyToken, u.changePassword);
router.get('/admin/all', verifyToken, verifyAdmin, u.adminGetAll);
router.get('/admin/stats', verifyToken, verifyAdmin, u.adminStats);

module.exports = router;
