const {Router} = require('express');
const { login, addUser, getAuth } = require('../controllers/users');
const { verifyToken } = require('../middlewares/auth');


const router = Router();

router.post('/login', login);
router.post('/', addUser);
router.get('/auth',verifyToken, getAuth)

module.exports= router;