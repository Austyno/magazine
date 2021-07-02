const router = require('express').Router()

const {
	register,
	login,
	forgotPassword,
	resetPassword,
	allUsers,
	changeRole,
	deleteUser,
} = require('../../controllers/users/usersController')

router.post('/login', login)


module.exports = router