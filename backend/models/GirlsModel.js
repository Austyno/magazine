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
			required: [true, 'please add a main image'],
		},
		photos: {
			type: Array,
			required: [true, 'please add images of the model'],
		},
		totalVotes: {
			type: Number,
			default: 0
		},
		voters: {
			type: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Model', ModelsSchema)
