const Model = require('../../models/GirlsModel')
const Error = require('../../utils/errorResponse')
const cloudStorage = require('../../utils/uploadToCloudinary')

exports.addModel = (req, res, next) => {
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
            data: girls
        })
    } catch (e) {
        return next(new Error(e.message,500))
    }
}
