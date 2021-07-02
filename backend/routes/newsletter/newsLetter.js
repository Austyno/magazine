const router = require('express').Router()
const { subNewsLetter, sendNewsLetter } = require('../../controllers/newsletter/NewsLetter')

router.route('/').post(subNewsLetter)
router.route('/send-mail').get(sendNewsLetter)

module.exports = router
