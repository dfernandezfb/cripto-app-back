const {Router} = require('express');
const { getCoins, addCoin, deleteCoin, getCoin } = require('../controllers/coins');
const { verifyToken } = require('../middlewares/auth');
const router = Router();

router.get('/', verifyToken, getCoins)
router.get('/coin/:id', verifyToken, getCoin)
router.post('/', verifyToken, addCoin)
router.delete('/:id', verifyToken, deleteCoin)

module.exports = router;