const router = require('express').Router()

const {
	addPost,
	getAllPost,
	singlePost,
	updatePost,
	tabPost,
	deletePost,
	topStories,
	todaysTake,
	allCatPosts,
} = require('../../controllers/post/postController')

router.route('/').post(addPost).get(getAllPost)
router.route('/category/:catId').get(tabPost)
router.route('/cat-posts/:catId').get(allCatPosts)
router.route('/todays-take').get(todaysTake)
router.route('/top-stories').get(topStories)
router.route('/:id').get(singlePost).put(updatePost).delete(deletePost)



module.exports = router
