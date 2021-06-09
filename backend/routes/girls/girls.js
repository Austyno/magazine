const router = require('express').Router()

const { addModel, allModels } = require('../../controllers/girls/girlsController')

//protected route
router.route('/').post(addModel).get(allModels)

module.exports = router