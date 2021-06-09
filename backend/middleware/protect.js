const jwt = require('jsonwebtoken')
const Error = require('../utils/Error')
const User = require('../models/User')

// Protect routes
exports.protect = async (req, res, next) => {
	let token

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		// Set token from Bearer token in header
		token = req.headers.authorization.split(' ')[1]
	}

	// Make sure token exists
	if (token === null) {
		return next(new Error('Not authorized to access this route', 401))
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		req.user = await User.findById(decoded.id)

		next()
	} catch (err) {
		return next(
			new Error('You are Not authorized to access this route', 401)
		)
	}
}

// Grant access to specific roles
exports.authorize = (req, res, next) => {
	if (req.user.role == 'admin') {
		return next()
	}
	return next(
		new Error(
			`User role ${req.user.role} is not authorized to access this route`,
			401
		)
	)
}
