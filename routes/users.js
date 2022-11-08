const router = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');

router.get('/me', getUserInfo); // возвращает информацию о пользователе (email и имя)
router.patch('/me', updateUserInfo); // обновляет информацию о пользователе (email и имя)

module.exports = router;
