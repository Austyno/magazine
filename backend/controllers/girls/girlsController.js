const Model = require('../../models/GirlsModel')
const Error = require('../../utils/errorResponse')
const cloudStorage = require('../../utils/uploadToCloudinary')
const CoverGirl = require('../../models/CoverGirlCompetitionModel')

exports.addModel = (req, res, next) => {
	/* TODO: rewrite to accomodate multiple images of model.
	db.animal.update(
      { "_id": "100" },
      {
          $push: {
              animalArray: "cat"
          }
      }
  );
*/
	const image = req.files.image
	const { name, bio } = req.body
	if (!image) {
		return next(new Error('An image is required', 400))
	}

	const allowed = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']

	if (!allowed.includes(image.mimetype)) {
		return next(
			new Error('The file type is not an image. Please upload an image', 400)
		)
	}

	try {
		cloudStorage(req.files.image.tempFilePath)
			.then(async result => {
				console.log(result.secure_url)
				await Model.create({
					name,
					bio,
					photo: result.secure_url,
				})

				res.status(200).json({
					success: true,
					data: 'image uploaded successfully',
				})
			})
			.catch(e => console.log(e.message))
	} catch (e) {
		return next(new Error(e.message, 500))
	}
}

exports.allModels = async (req, res, next) => {
	try {
		const girls = await Model.find({})
		res.status(200).json({
			success: true,
			data: girls,
		})
	} catch (e) {
		return next(new Error(e.message, 500))
	}
}
exports.singleModel = async (req, res, next) => {
	const { id } = req.params

	const girl = await Model.findById(id)

	if (!girl) {
		return next(new Error('this model does not exist', 400))
	}

	try {
		res.status(200).json({
			success: true,
			data: girl,
		})
	} catch (e) {
		return next(new Error(e.message, 500))
	}
}

exports.vote = async (req, res, next) => {
	const { modelId, competitionId, userEmail } = req.body

	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

	if (!filter.test(userEmail)) {
		return next(new Error('Please provide a valid email', 400))
	}

	const voter = await CoverGirl.findById(competitionId).findOne({
		voters: { $in: [userEmail] },
	})

	if (voter !== null) {
		return next(
			new Error(
				'You can only vote once. Looks like you have voted already',
				400
			)
		)
	}

	try {
		const model = await Model.findById(modelId)

		const updated = await model.updateOne({
			totalVotes: Number(model.totalVotes) + 1,
		})

		const compt = await CoverGirl.findById(competitionId)

		await compt.updateOne({
			$push: { voters: userEmail },
		})

		res.status(201).json({
			success: true,
			data: 'Your vote has been added successful. Thank you',
		})
	} catch (e) {
		return next(new Error(e.message, 500))
	}
}

exports.getCompetition = async (req, res, next) => {
	try {
		const compt = await CoverGirl.findOne({ active: true })
		res.status(200).json({
			success: true,
			data: compt,
		})
	} catch (e) {
		return next(new Error(e.message, 500))
	}
}
