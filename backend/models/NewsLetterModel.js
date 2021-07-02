const mongoose = require('mongoose')

const NewsLetterSchema = new mongoose.Schema(
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
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('NewsLetter', NewsLetterSchema)
