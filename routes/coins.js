const {Router} = require('express');
const { getCoins, addCoin, deleteCoin, getCoin, updateCoin } = require('../controllers/coins');
const { verifyToken } = require('../middlewares/auth');
const router = Router();

router.get('/', verifyToken, getCoins)
router.get('/coin/:id', verifyToken, getCoin)
router.post('/', verifyToken, addCoin)
router.put('/:id', verifyToken, updateCoin)
router.delete('/:id', verifyToken, deleteCoin)

module.exports = router;