const mongoose = require('mongoose')

const ModelsSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		bio: {
			type: String,
		},
		photo: {
			type: String,
			required: [true, 'please add an image'],
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Model', ModelsSchema)
