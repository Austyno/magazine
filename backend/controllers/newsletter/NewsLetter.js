const NL = require('../../models/NewsLetterModel')
const Error = require('../../utils/errorResponse')
const { sendMail } = require('../../utils/sendMail')
// const template = require('../../asset/email-template/email.ejs')

exports.subNewsLetter = async (req, res, next) => {
	const { email } = req.body

	try {
		const sub = await NL.create(req.body)
		res.status(200).json({
			success: true,
			data: 'email subscribed successfully',
		})
	} catch (e) {
		return next(new Error(e.message, 500))
	}
}

exports.sendNewsLetter = async (req, res, next) => {
	const emails = await NL.find({})

	try {
		emails.map(async email => {
			await sendMail(email, template)
		})

		res.status(200).json({
			success: true,
			data: '',
		})
	} catch (e) {
		return next(new Error(e.message, 500))
	}
}
exports.createNewsLetter = () => {}
