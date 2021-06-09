const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'please add a title'],
		},
		content: {
			type: String,
			required: [true, 'please add content to the post'],
		},
		image: {
			type: String,
		},
		category: {
			type: mongoose.Schema.ObjectId,
			required: true,
			ref: 'Category',
		},
		isPublished: {
			type: Boolean,
			default: false,
		},
		views: {
			type: String,
			default: '0',
		},
		author: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
)
module.exports = mongoose.model('Post', postSchema)
