const User = require('../../models/UserModel')
const Error = require('../../utils/errorResponse')
const generateJwtToken = require('../../utils/generateJWT')
const bcrypt = require('bcryptjs')

exports.register = async (req, res, next) => {
	const { email, password } = req.body

	if (!email || !password) {
		return next(new Error('please enter a password and email', 400))
	}
	const salt = bcrypt.genSaltSync(10)

	const hashedPass = bcrypt.hashSync(password, salt)

	password = hashedPass

	try {
		const user = await User.create(password, email)
		res.status(201).json({
			success: true,
			data: user,
		})
	} catch (e) {
		return next(new Error(e.message, 500))
	}
}

exports.login = async (req, res, next) => {
	const { email, password } = req.body

	if (!email || !password) {
		return next(new Error('please enter email and password', 400))
	}

	const user = await User.findOne({ email })

	if (user) {
		const check = bcrypt.compareSync(password, user.password)

		if (check) {
			try {
				const token = generateJwtToken(user._id)
				res.status(200).json({
					success: true,
					data: token,
				})
			} catch (e) {
				return next(new Error(e.message, 500))
			}
		} else {
			return next(new Error('invalid credentials'))
		}
	}
}
