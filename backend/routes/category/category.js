const router = require('express').Router()

const {
	addCat,
	getAllCat,
	singleCat,
} = require('../../controllers/category/categoryController')

router.route('/').post(addCat).get(getAllCat)
router.route('/:id').get(singleCat)

module.exports = router
