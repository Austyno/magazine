const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a category name'],
			trim: true,
		},
		viewsCount: {
			type: Number,
			default: 0,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{
		toJSON: { virtuals: true },
	}
)

CategorySchema.virtual('posts', {
	ref: 'Post',
	localField: '_id',
	foreignField: 'category',
	justOne: false,
})

module.exports = mongoose.model('Category', CategorySchema)
