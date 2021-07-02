const router = require('express').Router()
const { protect } = require('../../middleware/protect')

const {
	addModel,
	allModels,
	singleModel,
	vote,
	getCompetition,
} = require('../../controllers/girls/girlsController')

//protected route
router.route('/').post(addModel).get(allModels)
router.route('/vote').post(vote)
router.route('/competition').get(getCompetition)
router.route('/:id').get(singleModel)


module.exports = router
