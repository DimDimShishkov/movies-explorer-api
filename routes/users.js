const router = require('express').Router();
const { getUserInfo, updateUserProfile } = require('../controllers/users');

router.get('/me', getUserInfo); // возвращает информацию о пользователе (email и имя)
router.patch('/me', updateUserProfile); // обновляет информацию о пользователе (email и имя)

module.exports = router;
