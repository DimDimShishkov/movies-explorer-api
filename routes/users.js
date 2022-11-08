const router = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { patchUserCelebrate } = require('../utils/celebrate');

router.get('/me', getUserInfo); // возвращает информацию о пользователе (email и имя)
router.patch('/me', patchUserCelebrate, updateUserInfo); // обновляет информацию о пользователе (email и имя)

module.exports = router;
