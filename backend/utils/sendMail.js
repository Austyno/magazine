const nodeMailGun = require('mailgun-nodemailer-transport')
const nodeMailer = require('nodemailer')

const sendEmail = (email, template) => {
	const auth = {
		auth: {
			apikey: process.env.MAILGUN_API_KEY,
			domain: process.env.MAILGUN_DOMAIN,
		},
	}
	let transporter = nodeMailer.createTransport(nodeMailGun(auth))

	const mailOptions = {
		from: process.env.MAIL_FROM,
		to: email,
		subject: 'Cultura News Letter',
		html: template,
	}

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log(err)
		} else {
			console.log('message sent')
		}
	})
}

module.exports = { sendEmail }
