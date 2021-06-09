const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: [true, 'this email is already in use'],
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'please enter a valid email',
			],
		},
		password: {
			type: String,
			required: [true, 'please enter a password'],
		},
		role: {
			type: String,
			enum: ['admin', 'user'],
			default: 'user',
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

userSchema.virtual('post', {
	localField: '_id',
	foreignField: 'author',
	ref: 'Post',
})

module.exports = mongoose.model('User', userSchema)
