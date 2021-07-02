const mongoose = require('mongoose')

const competitionSchema = mongoose.Schema(
	{
		startDate: {
			Type: Date,
		},
		endDate: {
			type: Date,
		},
		active: {
			type: Boolean,
		},
		voters: {
			type: [String],
		},
	},
	{ timestamp: true }
)

module.exports = mongoose.model('CoverGirl', competitionSchema)
